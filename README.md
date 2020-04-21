# Cloud Developer Nanodegree - Capstone App

This App is realized as capstone project of Udacity Cloud Developer Nanodegree.
It use AWS Lambda and Serverless framework for the backend and React for the frontend.

# Functionality of the application

This application allow the authenticated user to upload a photo and see a list of all the photo uploaded.
Each user can add comment to each image but only the owner of the image could delete it.

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the Capstone app

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project.
