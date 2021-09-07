// imports
const express = require('express')
const cors = require('cors')
const utilities = require('./utilities')
const algo = require('./algo')
const path = require('path')

// initialization
const app = express()
app.use(cors())
app.use(express.json())
utilities.initializeYoutubeApi()
utilities.initializeMongoDB()

// TESTING CODE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//console.log(algo.CourseInit('quantum mechanics'))

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//
// back end
//

// auth
app.get('/auth', function(req, res) {
  utilities.authYouTubeApi(decodeURIComponent(req.query.code))
  res.send('successfully authenticated! you may now return to the app')
})

// course generation INPUT params={topic}
app.post('/api/gen/:topic', async function(req, res) {
  console.log(req.params.topic)
  var user = req.body.user
  var topic = req.params.topic
  var courseInit = await algo.CourseInit(topic)
  // using "test" user
  var random = Math.floor(Math.random()*1000000).toString(16)
  utilities.userdb.findOneAndUpdate({'userid': user}, {'$addToSet': {'courses': random}})
  utilities.coursedb.insertOne({ '_id': random, 'curr': 0, 'user': user, ...courseInit })
  res.send(courseInit)
})

// course feedback INPUT body={understood:boolean, feedback:string}
app.post('/api/feedback/:courseid', async function(req, res) {
  var courseid = req.params.courseid
  var understood = req.body.understood
  var feedback = req.body.feedback
  var courseFeedback = await algo.CourseFeedback(understood, feedback, courseid) // using "test" user
  res.send(courseFeedback)
})

// course update
app.post('/api/courses', async function(req, res) {
  var user = req.body.user
  var userInfo = await utilities.userdb.findOne({'_id': user})
  var courses = userInfo.courses
  var courseInfos = []
  for (var course in courses) {
    var courseInfo = await utilities.coursedb.findOne({'_id': course})
    courseInfos.push(courseInfo)
  }
  res.send(courseInfos)
})

//
// dummy front end
//
app.use('/', express.static(path.join(__dirname, './public')))
app.use('*', express.static(path.join(__dirname, './public')))

const port = 8080
console.log('app listening on port: ' + port)
app.listen(port)
