import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { CourseCard } from './CourseCard'
import { Feedback } from './Feedback'
import { LectureCard } from './LectureCard'
import { useLocation } from 'react-router-dom'
import api from '../../api'
import './Courses.css'

export function Courses(courseInfo) {
  const [courses, setCourses] = useState({err: 0, courses: []})
  const [course, setCourse] = useState({})
  const [currLecture, setCurrLecture] = useState({})
  const [courseContent, setCourseContent] = useState([])
  const [feedbackFlag, setFeedbackFlag] = useState(false)
  var loc = useLocation()
  useEffect(() => {
    api.getCourses().then(resp => {
      console.log(resp)
      if (resp.status < 400) {
        setCourses({err: 0, courses: resp.data})
      } else {
        setCourses({err: 1, courses: []})
      }
    })
  }, [])
  useEffect(() => {
    updateCourse(window.location)
  }, [courses, window.location, loc])
  var onSetCurrLecture = (newcourse) => {
    // TODO do some loading stuff here before the next courses load in
  }
  var updateCourse = () => {
    var location = window.location
    console.log("UPDATING COURSE WITH HASH: " + location.hash)
    var newcourse = {}
    for (var i = 0; i < courses.courses.length; i++) {
      if (courses.courses[i]._id == location.hash.slice(1)) {
        newcourse = courses.courses[i]
        break
      }
    }
    console.log(newcourse)
    console.log(courses)
    setCourse(newcourse)
    if (JSON.stringify(newcourse) != '{}') {
      // set curr course/curr lecture
      var currCourse = newcourse
      while (currCourse.playlist != undefined) {
        var currUnderstood = currCourse.playlist[currCourse.curr].understood
        if (currUnderstood == false)
          currCourse = currCourse.playlist[currCourse.curr]
        else
          break
      }
      //console.log(currCourse)
      setCurrLecture(currCourse)

      // update course content bottom bar content
      // (this is a modified in-order traversal of the nested playlist/video structure i've built)
      // TODO this should really all be logic moved to back end
      var content = []
      var lecturestack = []
      if (newcourse.playlist != undefined) {
        for (var i = newcourse.playlist.length - 1; i > -1; i--) {
          lecturestack.push(newcourse.playlist[i])
        }
        while (lecturestack.length > 0) {
          var currlec = lecturestack.pop()
          content.push(currlec)
          if (currlec.playlist != undefined) {
            var lastVideoInLayer = 0
            if (currlec.curr > 0) {
              if (currlec.playlist[currlec.curr - 1].understood) {
                lastVideoInLayer = currlec.curr - 1
              } else {
                lastVideoInLayer = currlec.curr
              }
            }
            for (var i = lastVideoInLayer; i > -1; i--) {
              lecturestack.push(currlec.playlist[i])
            }
          }
        }
        setCourseContent(content)
      }
    }

  }

  // submit feedback for the current lecture and reload the page
  // (TODO: don't reload, it's stupid and defeats the purpose of a SPA. just refresh a few components or something)
  var onSubmitFeedback = (understood, feedback) => {
    console.log('ready to submit feedback and refresh courses page')
    console.log(understood)
    console.log(feedback)
    api.sendFeedback(course._id, understood, feedback).then(res => {
      console.log(res)
      window.location.reload()
      // TODO GET RID OF THIS RELOAD AND MAKE IT UPDATE COURSE
      // right now there's some weird problem where it doesn't update :sadge:
      //updateCourse()
    })
  }
  //console.log(currLecture)

  /* 
  DEV NOTE: the whole "video.snippet.resourceId != undefined..." thing is a hack to account for the
  fact that YouTube's "playlist.list" APIs return their videos in a slightly different format than 
  the "search.list" API. The former returns video IDs in video.snippet.resourceId.videoId while the
  latter returns them in video.id.videoId. The same thing happens in Courses.js/LectureCard.js.
  */
  return (
    <div>
      <div className='courses'>
        <Typography variant='h4'>
          Course Selection
        </Typography>
        {courses.err == 0 ? 
        (courses.courses.length == 0 ?
        <Typography>It looks like you're not in any courses... why not <a href='search'>try a few?</a></Typography> :
        (courses.courses.map(course =>  {return <CourseCard onSelectCourse={onSetCurrLecture} courseInfo={course}/>})))
        :
        <Typography color='error'>It looks like there was a problem. Are you logged in?</Typography>}
      </div>
      <div className='currcourse'>
        <Typography variant='h4'>
          Content
        </Typography>
        {(JSON.stringify(currLecture) != '{}') ?
          <div>            
            <div className='currlecture'>
              <iframe 
                width='700' 
                height='400' 
                src={'https://www.youtube.com/embed/'+ ((currLecture.playlist[currLecture.curr].snippet.resourceId != undefined) ? currLecture.playlist[currLecture.curr].snippet.resourceId.videoId : currLecture.playlist[currLecture.curr].id.videoId)}
                title='YouTube video player' 
                frameborder='0' 
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
                allowfullscreen>
              </iframe>
            </div>
            <div className='feedback'>
              <Feedback onSubmitFeedback={onSubmitFeedback}/>
            </div>
            <div className='lecturescroll'>
              {courseContent.map(video => {return <LectureCard lectureInfo={video}/>})}
            </div>
            <p className='debug'>{JSON.stringify(course)}</p>
          </div> :
          <Typography className='course' variant='h6'>Choose a Course to continue above to get started</Typography>
        }
      </div>
    </div>
  )
}