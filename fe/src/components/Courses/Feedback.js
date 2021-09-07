import { Button, TextField, Typography, Grid, Switch } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { useState } from "react"

export function Feedback(props) {
  const [understood, setUnderstood] = useState(null)
  const [feedback, setFeedback] = useState(null)
  var onChangeFeedback = (e)  => {
    console.log(e.target.value)
    setFeedback(e.target.value)
  }
  var understoodYes = () => {
    setUnderstood(true)
  }
  var understoodNo = () => {
    setUnderstood(false)
  }
  var submitFeedback = () => {
    props.onSubmitFeedback(understood, feedback)
  }
  return (
    <div>
      <Typography>
        Answer the following in order to move on to the next video.
      </Typography>
      <Grid component='label' container spacing={1}>
        <Grid item>
          <Typography variant='caption'>
            Did you understand this material?
          </Typography>
        </Grid>
        <Grid item><Button onClick={understoodYes}><CheckIcon /></Button></Grid>
        <Grid item><Button onClick={understoodNo}><ClearIcon /></Button></Grid>
      </Grid>
      <br />
      {(understood == false) ? 
        <div>
          <Typography>
            We're sorry to hear that - what was confusing?
          </Typography>
        </div> :
        <div>
          <Typography>
            That's great! Any comments?
          </Typography>
        </div> 
      }
      {(understood != null) ? 
        <TextField onChange={onChangeFeedback}/> :
        <p></p>
      }
      <br />
      {(understood == true || (understood == false && feedback != null)) ? 
        <Button onClick={submitFeedback}>
          <KeyboardReturnIcon />
          Move on!
        </Button> :
        <p></p>
      }
    </div>
  )
}