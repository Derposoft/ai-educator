import { CourseSearch } from './components/CourseSearch/CourseSearch'
import { CoursePage } from './components/CoursePage/CoursePage'
import { Courses } from './components/Courses/Courses'
import { Button } from '@material-ui/core'

export function SiteHeader() {
  return (
    <div>
      <Button href='courses'>Your Courses</Button>
      <Button href='search'>Search Courses</Button>
      <Button disabled>Profile (Under Construction)</Button>
    </div>
  )
}