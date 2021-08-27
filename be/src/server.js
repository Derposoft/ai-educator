// imports
const express = require('express')
const utilities = require('./utilities')
const youtube = require('./youtube')
const cors = require('cors')

// initialization
const app = express()
app.use(cors())
utilities.initializeYoutubeApi()

//
// back end
//

// auth
app.get('/auth', function(req, res) {
  utilities.authYouTubeApi(decodeURIComponent(req.query.code))
  res.send('successfully authenticated! you may now return to the app')
})

// topic query (MOCKED)
app.get('/api/query/:topic', async function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  //var playlists = await youtube.listVideos(topic)
  // mock
  var playlists = { err: 0, playlists: [{ kind: 'youtube#searchResult',
  etag: 'VWeflzzuwJoyXTuWMWCvu3fxb0k',
  id:
   { kind: 'youtube#playlist',
     playlistId: 'PLUl4u3cNGP61-9PEhRognw5vryrSEVLPr' },
  snippet:
   { publishedAt: '2014-06-10T15:38:46Z',
     channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
     title: 'MIT 8.04 Quantum Physics I, Spring 2013 (2013)',
     description:
      'View the complete course: http://ocw.mit.edu/8-04S13 Instructor: Allan Adams This course covers the experimental basis of quantum physics. It introduces wave ...',
     thumbnails: [Object],
     channelTitle: 'MIT OpenCourseWare',
     liveBroadcastContent: 'none',
     publishTime: '2014-06-10T15:38:46Z' } },
{ kind: 'youtube#searchResult',
  etag: 'kvIp3F5jyDmrqjL1uLFJM5BvBW4',
  id:
   { kind: 'youtube#playlist',
     playlistId: 'PLUl4u3cNGP60cspQn3N9dYRPiyVWDd80G' },
  snippet:
   { publishedAt: '2017-06-22T15:07:39Z',
     channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
     title: 'MIT 8.04 Quantum Physics I, Spring 2016',
     description:
      'MIT 8.04 Quantum Physics I, Spring 2016 View the complete course: http://ocw.mit.edu/8-04S16 Instructor: Barton Zwiebach License: Creative Commons ...',
     thumbnails: [Object],
     channelTitle: 'MIT OpenCourseWare',
     liveBroadcastContent: 'none',
     publishTime: '2017-06-22T15:07:39Z' } }]}
  //console.log('sending: ' + playlists)
  res.send(playlists)
})

// get user's courses
app.post('/api/courses', async function(req, res) {
  // dummy course
  var course = {
    etag: 'VWeflzzuwJoyXTuWMWCvu3fxb0k',
    playlistId: 'PLUl4u3cNGP61-9PEhRognw5vryrSEVLPr'
  }

})

const port = 8080
console.log('app listening on port: ' + port)
app.listen(port)
