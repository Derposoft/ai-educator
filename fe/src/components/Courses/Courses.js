import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import api from '../../api'
import { Course } from '../Courses/Course'

export function Courses(courseInfo) {
  const [courses, setCourses] = useState({err: 0, courses: []})
  useEffect(() => {
    api.getCourses().then(resp => {
      if (resp.status < 400) {
        setCourses(resp.data)
      } else {
        setCourses({err: 1, courses: []})
      }
    })
  }, [])

  return (
    <div>
      {courses.err == 0 ? 
      (courses.courses.length == 0 ?
      <Typography>It looks like you're not in any courses... why not <a href='search'>try a few?</a></Typography> :
      (courses.courses.map(course =>  {return <Course courseInfo={course}/>})))
      :
      <Typography color='error'>It looks like there was a problem. Are you logged in?</Typography>}
    </div>
  )
}