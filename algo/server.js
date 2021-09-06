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
app.get('/api/query/:topic', async function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  var courseInit = await algo.CourseInit(topic)
  // using "test" user
  utilities.db.insertOne({ '_id': 'test', 'curr': 0, ...courseInit })
  res.send(courseInit)
})

// course feedback INPUT body={understood:boolean, feedback:string}
app.post('/api/feedback', async function(req, res) {
  var understood = req.body.understood
  var feedback = req.body.feedback
  var courseFeedback = await algo.CourseFeedback(understood, feedback, 'test') // using "test" user
  res.send(courseFeedback)
})

// course update
app.post('/api/getcourses', async function(req, res) {
  var courseInfo = await utilities.db.findOne({'_id': 'test'}) // using "test" user
  res.send(courseInfo)
})

//
// dummy front end
//
app.use('/', express.static(path.join(__dirname, './public')))
app.use('*', express.static(path.join(__dirname, './public')))

const port = 3000
console.log('app listening on port: ' + port)
app.listen(port)
