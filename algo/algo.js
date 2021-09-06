var {google} = require('googleapis');
var youtube = google.youtube('v3');
var utilities = require('./utilities')

/**
 * 
 * @param {string} topic the topic on which to generate a course.
 * @returns a "course" comprising of a list of youtube videos.
 * The output will look EXACTLY like the following array:
 * [
 * video1 = {
 *  id: video_id,
 *  title: video_title,
 *  description: video_description
 * },
 * video2 = {
 *  id: video_id,
 *  title: video_title,
 *  description: video_description
 * },
 * ...
 * ]
 * 
 * The ordering of the videos matters;
 * The array can have 0 elements in the event of an error;
 * 
 * The steps this algorithm takes are outlined in the README in this directory.
 */
async function CourseInit(topic) {
  // only search MIT OCW for now - others can be added as necessary but this conserves
  var playlists = await youtube.search.list({
    part: 'snippet',
    q: topic,
    channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
    type: 'playlist',
    maxResults: 1
  },).then(resOnFulfill => {
    console.log(resOnFulfill.data.items)
    var playlists = resOnFulfill.data.items
    /*// perhaps add a model here to determine "best pick" courses from the list
    for (var i = 0; i < items.length; i++) {
      var playlist = items[i]
      var title = playlist.snippet.title
      var description = playlist.snippet.description
    }*/
    var playlist = playlists[0]
    console.log(playlist)
    console.log(playlist.id)
    console.log(playlist.id.playlistId)
    return youtube.playlistItems.list({ 'part': 'snippet', 'playlistId': playlist.id.playlistId, 'maxResults': 25}).then(fulfill => {
      console.log(fulfill)
      return { err: 0, playlist: fulfill }
    }, reject => {
      return { err: 1, playlist: reject }
    })
  }, resOnReject => {
    console.log(resOnReject)
    return { err: 1, playlist: [] }
  })
  utilities.db.insertOne({ '_id': 'test', 'payload': playlists })
  return playlists
}

async function CourseFeedback(lecture) {
  
}

var algo = {
  CourseInit: CourseInit
}

module.exports = algo
