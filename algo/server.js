// imports
const express = require('express')
const cors = require('cors')
const utilities = require('./utilities')
const algo = require('./algo')
const path = require('path')

// initialization
const app = express()
app.use(cors())
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

// course generation
app.get('/api/query/:topic', async function(req, res) {
  console.log(req.params.topic)
  var topic = req.params.topic
  var initCourse = await algo.CourseInit(topic)
  res.send(initCourse)
})

//
// dummy front end
//
//app.use(express.static('public'))
/* final catch-all route to index.html defined last
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/public/');
}) */

app.use('/', express.static(path.join(__dirname, './public')))
app.use('*', express.static(path.join(__dirname, './public')))

const port = 3000
console.log('app listening on port: ' + port)
app.listen(port)
