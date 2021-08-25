// imports
const express = require('express')
const app = express()
const utilities = require('./utilities')
const youtube_api = require('./youtube_api')

// initialization


// back end
app.get('/learn/:topic', function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  res.send('It looks like you\'d like to learn about ' + topic + ' today! Let\'s get started.')
})

app.listen(3000)
