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

// topic query
app.get('/learn/:topic', function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  var playlists = await youtube.listVideos(topic)
  res.send(playlists)
})

const port = 3000
console.log('app listening on port: ' + port)
app.listen(port)
