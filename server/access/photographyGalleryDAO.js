let galleryPhotographs
import url from 'url'; 

export default class PhotographsGalleryDAO {
    static async injectDB(conn) {
        if (galleryPhotographs) {
            return
        }
        try {
            galleryPhotographs = await conn.db('undisclosed_db').collection('photo_details_v3')
        } catch (e) {
            console.error('Unable to establish a collection handle in PhotographersDAO: error ' + e)
        }
    }


    static async getGalleryPhotographs (req) {
        let cursor
        let fileName = url.parse(req.url, true).query.filename
        // console.log(fileName)
        try {
            if (fileName != undefined) {
                cursor = await galleryPhotographs.find({'filename': fileName})
            }
            else {
                cursor = await galleryPhotographs.find()
            }

            const output = await cursor.toArray()
            return output
        }
        catch (e) {
            console.error('Unable to process galleryPhotographs.find({})')
            return ['errorFecthinggalleryPhotographs']
        }

    }
}