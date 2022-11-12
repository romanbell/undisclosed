import datetime
from pymongo import MongoClient
import os                
import pandas as pd
import glob                    
import base64
from exif import Image as exifImage
from PIL import Image as PILImage
import struct
import imghdr
from dotenv import load_dotenv

MONGO_DB_NAME = 'undisclosed_db'
MONGO_PHOTOS_COLLECTION_NAME = 'photo_details_v3'
OUTPUT_DIR = 'photos_resized'
IN_DIR = 'photos_input'
PATH_TO_LOCATION_MAP = 'photo_location_dict.csv'
TARGET_WIDTH_PX = 1200
FILES_WITH_SKETCHY_EXIF_DATA = ['IMG_7649.jpg']


class MongoImageLoader():
    def __init__(self):
        '''
        TODO: Populate ********
        # https://towardsdatascience.com/read-and-edit-image-metadata-with-python-f635398cd991
        # https://exif.readthedocs.io/en/latest/api_reference.html#image-attributes
        '''
        load_dotenv(os.path.join(os.getcwd(), 'server', '.env'))
        self.MONGODB_PASSWORD = os.environ.get('MONGO_PWD')
        if self.MONGODB_PASSWORD is None:
            raise Exception('Error loading env vars')

    def run_and_load_images(self):
        '''
        Main driver method
        '''
        print('Loading all photos into MongoDB...')
        os.chdir('loaders')

        self.resize_all_images(IN_DIR, OUTPUT_DIR)
        lookup_df = pd.read_csv(PATH_TO_LOCATION_MAP)
        self.retag_exif_for_all_images(lookup_df)
        os.chdir(OUTPUT_DIR)
        self.delete_all_existing_records()
        self.upload_to_mongodb(lookup_df)

        os.chdir('..')

    def get_image_size(self, fname):
        '''
        Determine the image type of fhandle and return its size. From draco
        '''
        with open(fname, 'rb') as fhandle:
            head = fhandle.read(24)
            if len(head) != 24:
                return
            if imghdr.what(fname) == 'png':
                check = struct.unpack('>i', head[4:8])[0]
                if check != 0x0d0a1a0a:
                    return
                width, height = struct.unpack('>ii', head[16:24])
            elif imghdr.what(fname) == 'gif':
                width, height = struct.unpack('<HH', head[6:10])
            elif imghdr.what(fname) == 'jpeg':
                try:
                    fhandle.seek(0) # Read 0xff next
                    size = 2
                    ftype = 0
                    while not 0xc0 <= ftype <= 0xcf:
                        fhandle.seek(size, 1)
                        byte = fhandle.read(1)
                        while ord(byte) == 0xff:
                            byte = fhandle.read(1)
                        ftype = ord(byte)
                        size = struct.unpack('>H', fhandle.read(2))[0] - 2
                    # We are at a SOFn block
                    fhandle.seek(1, 1)  # Skip `precision' byte.
                    height, width = struct.unpack('>HH', fhandle.read(4))
                except Exception: #IGNORE:W0703
                    return
            else:
                return
            return width, height


    def resize_all_images(self, in_dir, out_dir):
        '''
        Downsize all source images for storage/API throughput performance improvements. 
            - Note, if any file corruption occurs it is likely from metadata/exif tagging 
            and not from this method
        '''
        size_df = pd.DataFrame()
        for idx, file in enumerate(list(glob.glob(os.path.join(os.getcwd(), in_dir,  '*')))):
            file_name = str(file).replace(os.path.join(os.getcwd(), in_dir, '' ), '') #filename no path
            size_df[idx] = [file_name, self.get_image_size(str(file))[0], self.get_image_size(str(file))[1]]
            
        size_df = size_df.T
        size_df.columns = ['filename', 'width', 'height']
        size_df.loc[:, 'aspect'] = size_df['width']/size_df['height']
        size_df.loc[:, 'new_width'] = TARGET_WIDTH_PX
        size_df.loc[:, 'new_height'] = (size_df['new_width'] / size_df['aspect']).astype(int)

        isExist = os.path.exists(out_dir)
        if not isExist:
            os.makedirs(out_dir)

        for i in size_df.index:
            filename = size_df.loc[i, 'filename']
            print(f"Resizing {in_dir}/{filename}")
            image = PILImage.open(os.path.join(os.getcwd(), in_dir, filename))
            exif = image.info['exif']
            new_width = size_df.loc[i, 'new_width']
            new_height = size_df.loc[i, 'new_height']
            resized_image = image.resize((new_width, new_height))
            resized_image.save(os.path.join(out_dir, filename), exif=exif)

    # def rename_metadata_tags_for_location(self, input_dir, output_dir, input_filename, lookup_df):
    def retag_exif_for_all_images(self, lookup_df):
        '''
        Rename metadata for each file. During upload, this data is used to populate location fields. The
        date from source file should be unchanged and is used for date field in db. This section is prone
        to errors when raw source images have been edited outside of Adobe Lightroom (i.e. iphone photos, Gimp, Instagram, etc.)
        '''
        isExist = os.path.exists(OUTPUT_DIR)
        if not isExist:
            os.makedirs(OUTPUT_DIR)

        lookup_df = lookup_df.set_index('src_filename')
        for input_filename in lookup_df.index:

            img_path = f'{OUTPUT_DIR}/{input_filename}'
            with open(img_path, 'rb') as img_file:
                img = exifImage(img_file)

            img.copyright = 'Roman Bellisari {}'.format(datetime.datetime.now().strftime('%Y'))
            if input_filename not in FILES_WITH_SKETCHY_EXIF_DATA: 
                img.user_comment = str(lookup_df.loc[input_filename].location)

            output_filename = lookup_df.loc[input_filename].dest_filename
            with open(f'{OUTPUT_DIR}/{output_filename}', 'wb') as new_image_file:
                new_image_file.write(img.get_file())

            print(f"{OUTPUT_DIR}/{input_filename} renamed to {OUTPUT_DIR}/{output_filename}")

    def delete_all_existing_records(self):
        '''
        Drop existing collection so new writes are from empty collection
        '''
        print("Deleting all existing records in db: {MONGO_DB_NAME}, collection:{MONGO_PHOTOS_COLLECTION_NAME}")
        try:
            conn = MongoClient(f"mongodb+srv://romanbell:{self.MONGODB_PASSWORD}@cluster0.qzaqz.mongodb.net/test")
            print("MongoDB connection successfully established...")
        except:  
            print("Could not connect to MongoDB")

        db = conn.get_database(MONGO_DB_NAME)
        collection = db.get_collection(MONGO_PHOTOS_COLLECTION_NAME)
        x = collection.delete_many({})
        print(f"Successfully deleted {x.deleted_count} documents")

    def upload_to_mongodb(self, lookup_df):
        '''
        Upload processed records
        '''
        try:
            conn = MongoClient(f"mongodb+srv://romanbell:{self.MONGODB_PASSWORD}@cluster0.qzaqz.mongodb.net/test")
            print("MongoDB connection successfully established...")
        except:  
            print("Could not connect to MongoDB")

        db = conn.get_database(MONGO_DB_NAME)
        collection = db.get_collection(MONGO_PHOTOS_COLLECTION_NAME)

        lookup_df = lookup_df.reset_index().set_index('dest_filename')
        for idx, file in enumerate(lookup_df.index.tolist()):
            record = {}
            record['filename'] = file
            
            # Open for b64 encoding
            with open(file, 'rb') as img_file:
                img64 = base64.b64encode(img_file.read()).decode()
            record['data_bin'] = img64
            
            # Open for metadata tagging
            with open(file, 'rb') as img_file: 
                img = exifImage(img_file)
                if file != '0045.jpg':
                    date_full = img.datetime_original
                    date_str = img.datetime_original.replace(':', '')
                    date_str = date_str[:len(date_str) - 7]
                else:
                    date_full = '2019:12:14 00:00:00'
                    date_str = '20191214'

                if file == '0097.jpg':
                    location = 'San Pedro La Laguna, Guatemala'
                else:
                    location = img.user_comment
            
            record['date_full'] = date_full
            record['date_formatted'] = date_str
            record['location'] = location
            record['date_uploaded'] = datetime.datetime.now().strftime("%Y-%m-%d")

            collection.insert_one(record)   
            print('record {i} inserted successfully - record: {r}'.format(i=idx, r=record['filename']))


if __name__ == '__main__':
    mongoRunner = MongoImageLoader()
    mongoRunner.run_and_load_images()
    print('Load complete!')