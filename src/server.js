// imports
const express = require('express')
const utilities = require('./utilities')
const youtube = require('./youtube')

// initialization
const app = express()
utilities.initializeYoutubeApi()

//
// back end
//

// auth
app.get('/auth', function(req, res) {
  utilities.authYouTubeApi(decodeURIComponent(req.query.code))
  res.send('successfully authenticated! you may now return to the app')
})

// learning
app.get('/learn/:topic', function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  youtube.listVideos(topic) //test
  res.send('It looks like you\'d like to learn about ' + topic + ' today! Let\'s get started.')
})

const port = 3000
console.log('app listening on port: ' + port)
app.listen(port)
