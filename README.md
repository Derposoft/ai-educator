# Welcome to the AI Course Generator and Educator.

This is a web app designed to use AI to generate structured, educational content by leveraging the existing media on content-sharing platforms. In theory, any content-sharing platform could be used - DailyMotion, YouTube, Vimeo, and so on - but for this prototype, I have chosen YouTube, as it has a simple, free-to-use API. This basic prototype, while containing elements of "AI", does not *yet* use any ML - but future plans to do so, including the currently-implemented algorithm running in the back end, can all be found under the "Recommender Algorithm Specifics" section below.

To clarify, *this is not a complete project, nor do I plan to complete it ~~in this repository~~.* This is only a practical prototype which I presented in order to gain invitation to the team of USC students ~~- which I am now a part of -~~ who are developing a complete version of this project. ~~More details on that project may be found here in the future, if it ends up coming to fruition.~~

**Update As of Oct. 2021:** Due to time limitations between grad school work and my research job at the USC Institute for Creative Technologies, I have decided to leave this group. However, standalone, the project in this repository is still one that I am proud of. It is possible that I will make some more commits here -- especially if I decide in the future that I want to put some of my AI knowledge down the line to use for fun -- but for the time being, my focus will be academic in nature.

### 1. Usage Instructions

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

### 2. User Flow Photos
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

### 3. Recommender Algorithm Specifics (/be/src/algo.js)

The following is the "course generation algorithm" used in the back end of this prototype and the reasoning behind its choice. Afterwards, possible future work into the incorporation of ML models to bolster the functionality of the project is discussed.

##### The Logic
My simple algorithm is designed with the following tenets in mind:

1. **Learning is interactive.** The algorithm should at the very least receive binary responses on whether or not a user truly understands the material before moving on and serving new material. Optimally, it should give the user the opportunity to expand on specifically what they do not understand, and provide related resources automatically.
2. **Learning must be reinforced.**  Most people can't learn something perfectly on their first try - and even if they do, most people find it hard to retain newly-learned, complicated concepts for a long time. The algorithm should make sure to occasionally drill old concepts back into a user's mind.
3. **Everyone learns differently.** The best algorithm should, over time, learn how a specific user will respond to a learning experience, and provide materials that it knows that the user will respond more positively to. This includes choosing:
- optimal initial course lectures when generating a course to begin with
- optimal supplemental materials when a user doesn't understand something
- optimal interpretation of a user's feedback to provide best suggestions
- essentially any other facet of this problem which requires "choosing" something

##### The Algorithm
The 2 steps of the algorithm (granted, there are some sub-steps) are as follows:
1. **Find Course "Backbone" (one-time step)**

Start with a YouTube playlist on the topic from a reputable source (e.g. MIT OCW, Stanford, Khan Academy, etc.). These videos will serve as a "backbone" for the learning experience. This is the most efficient way to ensure a cohesive learning experience. However, in the future, the individual videos could potentially be generated using video transcripts or video titles.

2. **Teach (recursive step)**

Begin playing through the course 1 lecture at a time. 

(tenet 1 + tenet 2)
After each lecture, ask the student whether or not they understood the material.
- If they didn't, ask why they didn't and save the response.
  - Understand why they didn't and inject more videos related to their misunderstanding into the material before feeding them the next lecture.
  - Repeat this process of injecting videos until the user understands the content. Save the time it took them to understand the content to determine when to give them a refresher.
- Otherwise continue to the next lecture

##### Future Plans for the use of ML and more complicated AI techniques
(tenet 2 + tenet 3)
- Before each lecture, feed a transcript for that lecture into a machine that scores the content on its complexity. A fine-tuned version of BERT could be used (https://arxiv.org/pdf/1905.05583.pdf ?). Use this complexity score of the material to determine when the user should see the video again, based on how the user has interacted with material that had similar complexity scores in the past.
- NLP/AI to pick the specific course(s) to inject instead of picking the first one in the search (as it currently does).
- NLP/AI to "interpret" the user's feedback and generate more accurate search terms instead of pasting the feedback into the YouTube search bar.
- Potentially generating our own course "backbone" via a model - as opposed to picking a course from MIT OCW, Stanford, etc. - in order to gain the ability to generate courses outside of those offered by these sources.
