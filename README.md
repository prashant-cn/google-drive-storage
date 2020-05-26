# google-drive-storage
Simple Product API's with Google Drive API to store/fetch all the assets in/from Google Drive.

This is a simple API for people to practice E-Commerce like functionality, especially UX and Mobile developers to insert, fetch and fetch single product by ID. For Backend Developers to see the the working of an API along with the working of Google Drive API for storage using NodeJS.

Prerequisites to run the app in local enviroment
1. Installed NodeJS
2. Installed MongoDB along with a MogoDB GUI, I'm using Robo 3T.

<b>Step 1:</b>
Follow steps from Google Drive API for NodeJS, URL: https://developers.google.com/drive/api/v3/quickstart/nodejs

<b>Step 2:</b>
Get a "credentials.json" by clicking on "Enable the Drive API".

<b>Step 3:</b>
Put the "credentials.json" file inside "src/auth" folder.

<b>Step 4:</b> Create a "config" folder in parallel to "src" folder, then a "dev.env" file insde the "config" folder with MongoDB URL.
Example: MONGO_DB_PATH=mongodb://127.0.0.1:27017/products-api

<b>Step 5:</b>
Run the app in local enviroment and follow the steps shown in terminal window to genrate "token.json".

<b>Step 6:</b>
Change the "parents" ID inside "src/utils/driveFunctions.js" with your own folder ID from google drive or simply comment out the "parents" property to store the files in you root of google drive.

<b>Congratulations!</b> You are good to GO now.


If anyone wants to directly use the API for practice purpose, then head over to below URL along with the mentioned parameters

1. <b>Insert a Product</b></br>
URL: http://prashant-cn-google-drive-api.herokuapp.com/upload</br>
Params: image, name, price, description</br>
Method: POST</br>

2. <b>Fetch all products</b></br>
URL: http://prashant-cn-google-drive-api.herokuapp.com/products</br>
Params: None</br>
Method: GET</br>

3. <b>Fetch single product by ID</b></br>
URL: http://prashant-cn-google-drive-api.herokuapp.com/product/:id</br>
Params: replace ":id" with the "_id" from 2nd API route.</br>
Method: GET</br>

Ping me at https://www.linkedin.com/in/prashant-kumar-2124b3b4/
if any of you have any questions, suggestions, feedback or just want to say Hi:)

