// imports
const express = require('express')
const utilities = require('./utilities')
const youtube_api = require('./youtube_api')

// initialization
const app = express()

// back end
app.get('/learn/:topic', function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  res.send('It looks like you\'d like to learn about ' + topic + ' today! Let\'s get started.')
})

const port = 3000
console.log('app listening on port: ' + port)
app.listen(port)
