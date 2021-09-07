import axios from 'axios'

const SERVER_URI = 'http://localhost:8080'

async function sendQuery(topic) {
  try {
    var playlists = await axios.post(SERVER_URI + '/api/gen/' + topic, {
      user: localStorage.getItem('user')
    })
    console.log(playlists)
    return playlists
  } catch {
    return {
      status: 500
    }
  }
}

async function sendFeedback(courseid, understood, feedback) {
  try {
    var feedbackResp = await axios.post(SERVER_URI + '/api/feedback/'+courseid, {
      user: localStorage.getItem('user'),
      understood: understood,
      feedback: feedback
    })
    return feedbackResp
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
  sendFeedback: sendFeedback,
  getCourses: getCourses
}

export default api