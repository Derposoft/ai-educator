import axios from 'axios'

const SERVER_URI = 'http://localhost:8080/'

async function sendQuery(topic) {
  try {
    var playlists = await axios.get(SERVER_URI + 'query/' + topic)
    console.log(playlists)
    return playlists
  } catch {
    return {
      status: 500
    }
  }
}

var api = {
  sendQuery: sendQuery
}

export default api