# Local 
# cd .ssh
# ssh -i aws_ec2_key.pem ubuntu@ec2-54-174-139-160.compute-1.amazonaws.com

# EC2
sudo service nginx stop

sudo pm2 kill && pm2 kill

cd undisclosed

sudo rm -r build

sudo rm -r node_modules

sudo rm -r server/node_modules

git remote update

git pull

npm install

cd server && npm install

cd ..

sudo rm .env

echo "REACT_APP_BASE_URL_REQUEST=http://www.undisclosedmedia.xyz" > .env

npm run build

cd server

# Sudo nano index.js (change MONGO_PWD const...)

pm2 start index.js

sudo service nginx start

sudo nginx -t

# Test API 

curl -i "http://www.undisclosedmedia.xyz/api/v1/photographers"
