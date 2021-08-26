var {google} = require('googleapis');
var youtube = google.youtube('v3');

// lists a set of videos to start off
async function listVideos(topic) {
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

module.exports = {
  listVideos: listVideos
}
