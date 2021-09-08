import { Card, CardContent, CardActions, Button, Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import './Courses.css'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

/**
 * 
 * @param info in the following structure:
 * info = {
 *  title: [title],
 *  description: [desc],
 *  playlistId: [youtube playlist id]
 * }
 * @returns 
 */
export function CourseCard(props) {
  const classes = useStyles()
  var course = props.courseInfo
  return (
    <div style={{'display': 'inline-block'}}>
      <Card className={classes.root} className='course'>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {course.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={'#'+course._id} onClick={() => props.onSelectCourse(course)}>Continue</Button>
        </CardActions>
      </Card>
    </div>
  )
}