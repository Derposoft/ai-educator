# Welcome to the YouTube Education Project.
### 1. Recommender Algorithm Specifics

Specifics on the general idea for the algorithm used in this project are in the README file under the be/ folder.

### 2. Usage Instructions

1. Use of this project requires a youtube secret key json file. Instructions for how to obtain this file can be found at the following link: https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps. If you need a hint: Ctrl+F "client_secret.json" and follow all the instructions leading up to that text.

2. The client_secret.json file must be renamed to youtube_secret.json and put into a new folder "secrets/" in the root directory.

3. Use of this project also requires a mongodb secret key json file. Create an account with the MongoDB Atlas cloud service (active as of September 2021, the writing of this line in this README) and after creating a database, create 2 collections named "users" and "courses". The secret file should be placed under mongodb_secret.json under the "secrets/" directory and look like the following document:
{
  "username": "username",
  "password": "password",
  "URI": "mongodb+srv://username:password@mongodbserver",
  "db": "dbname",
  "users": "users",
  "courses": "courses"
}

3. Run the server by using the command "node server.js" for be/src/server.js.

4. Run the front end in debug mode by using the command "npm start" under the directory fe/

### 3. User Flow Photos



**User Flow Photos**

[Home Page](./images/1-home.png)