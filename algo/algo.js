var {google} = require('googleapis');
var youtube = google.youtube('v3');
var utilities = require('./utilities')

/**
 * 
 * @param {string} topic the topic on which to generate a course.
 * @param {string} user the user in question.
 * @returns a "course" comprising of a list of youtube videos.
 * The output will look EXACTLY like the following object:
 * {
 *  err: 0 | 1,
 *  playlist:
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
 * }
 * 
 * The ordering of the videos matters;
 * The array can have 0 elements in the event of an error;
 * 
 * The steps this algorithm takes are outlined in the README in this directory.
 */
async function CourseInit(topic) {
  // only search MIT OCW for now - others can be added as necessary but this conserves
  var playlist = await youtube.search.list({
    part: 'snippet',
    q: topic,
    channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
    type: 'playlist',
    maxResults: 1
  },).then(resOnFulfill => {
    console.log(resOnFulfill.data.items)
    var playlists = resOnFulfill.data.items
    // perhaps add a model here to determine "best pick" courses from the list
    /*for (var i = 0; i < items.length; i++) {
      var playlist = items[i]
      var title = playlist.snippet.title
      var description = playlist.snippet.description
    }*/
    var playlist = playlists[0]
    return youtube.playlistItems.list(
        { 
          'part': 'snippet', 
          'playlistId': playlist.id.playlistId, 
          'maxResults': 25}
        ).then(fulfill => {
      return { err: 0, playlist: fulfill.data.items }
    }, reject => {
      return { err: 1, playlist: [] }
    })
  }, resOnReject => {
    console.log(resOnReject)
    return { err: 1, playlist: [] }
  })
  return playlist
}

/**
 * iterative portion of algorithm. provide feedback on current video.
 * this it the ONLY way to progress through a course
 * @param {*} understood boolean. true if user understood, false if not
 * @param {*} feedback actual text feedback from user
 * @returns the updated course after user feedback is saved and taken into account
 */
async function CourseFeedback(understood, feedback, user) {
  // take understanding and feedback into account and find a new set of videos to add onto this one
  var playlist = []
  if (understood == false) {
    var result = await CourseInit(feedback)
    if (result.err == 0) {
      playlist = result.playlist
    }
  }
  // update database with user understanding and feedback and new videos
  var currCourse = await utilities.db.findOneAndUpdate({ '_id': user }, {'$set': {'understood': understood, 'feedback': feedback, 'playlist': playlist}, '$inc': {'curr': 1}})
  return currCourse
}

var algo = {
  CourseInit: CourseInit,
  CourseFeedback: CourseFeedback
}

module.exports = algo
