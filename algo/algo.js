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
async function CourseGen(topic) {
  // only search MIT OCW for now - others can be added as necessary but this conserves
  var playlists = await youtube.search.list({
    part: 'snippet',
    q: topic,
    channelId: 'UCEBb1b_L6zDS3xTUrIALZOw',
    type: 'playlist',
    maxResults: 50
  },).then(resOnFulfill => {
    console.log(resOnFulfill.data.items)
    var playlists = resOnFulfill.data.items
    /*// perhaps add a model here to determine "best pick" courses from the list
    for (var i = 0; i < items.length; i++) {
      var playlist = items[i]
      var title = playlist.snippet.title
      var description = playlist.snippet.description
    }*/
    return { err: 0, playlists: playlists }
  }, resOnReject => {
    console.log(resOnReject)
    return { err: 1, playlists: [] }
  })
  return playlists
}

var algo = {
  CourseGen: CourseGen
}

module.exports = algo
