# Welcome to the YouTube Education Project.

*This is not a complete project, nor do I plan to complete it in this repository.* This is only a practical prototype which I presented as a part of the application process to join the team of USC students - which I am now a part of - to develop a complete version of this project. More details on that project may be found here in the future, if it ends up coming to fruition.

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
If all goes well, the app should look like the following, and has the following user experience flow.

1. When you open the app for the first time, you are led to a landing page which tells you to navigate using the nav bar. If you have no courses, the "YOUR COURSES" (YC) page will be empty - so the user is naturally led to the "GENERATE A COURSE" (GAC) page.

![Home Page](https://github.com/Derposoft/youtube-edu-research/blob/main/images/1-home.png)

2. Once on the GAC page, the user should follow the instructions and tell the service what they want to learn about by typing it into the textbox and clicking the next button, or hitting enter. This will direct them to the YC page.

![Course Generation](https://github.com/Derposoft/youtube-edu-research/blob/main/images/2-course_generation.png)

3. Once on the YC page, the user will see a list of their currently-enrolled courses at the top of the page. Upon clicking "CONTINUE", content for the specified course populates the bottom half of the page. Below that is just debug information - just ignore it :).

![Courses page](https://github.com/Derposoft/youtube-edu-research/blob/main/images/3-courses.png)

4. In order to progress in the course, the user has to answer to the right of the video: "Did you understand the material?" In the event that the user clicks X, they are forced to give a reason. After they provide the reason and click next, they will are redirected to the next video.

![No Understanding](https://github.com/Derposoft/youtube-edu-research/blob/main/images/4-no_understanding.png)

5. If they didn't understand, the next video in the course is delayed and a supplemental help video is injected into the course instead, chosen based on the provided feedback. Once again, for every video, the user must answer whether or not they understand the content. In the event that they do, they are allowed to provide an optional note on the video.

![Yes Understanding](https://github.com/Derposoft/youtube-edu-research/blob/main/images/5-yes_understanding.png)

6. If they did understand, the course continues progressing as normal.

![Course Progression](https://github.com/Derposoft/youtube-edu-research/blob/main/images/6-course_progression.png)

Have fun learning!
