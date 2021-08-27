import axios from 'axios'

const SERVER_URI = 'http://localhost:3000/'

async function sendQuery(topic) {
  try {
    var playlists = await axios.get(SERVER_URI + '/api/query/' + topic)
    console.log(playlists)
    return playlists
  } catch {
    return {
      status: 500
    }
  }
}

async function getCourses() {
  try {
    var courses = await axios.post(SERVER_URI + '/api/courses/', {
      user: localStorage.getItem('user')
    })
    console.log(courses)
    return courses
  } catch {
    return {
      status: 500
    }
  }
}

var api = {
  sendQuery: sendQuery,
  getCourses: getCourses
}

export default api