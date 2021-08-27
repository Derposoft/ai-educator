import { Button, Typography } from "@material-ui/core"
import './HomePage.css'

export function HomePage() {
  return (
    <div className='content'>
      <img src='icon.png'/>
      <br />

      <Typography variant='overline'>
        <p style={{fontSize: '23px'}}>
          Welcome Back. Use the Navigation Bar at the top of the page to begin.
        </p>
      </Typography>

      <Typography variant='caption' style={{position: 'absolute', bottom: '0%', left: '0%'}}>
        <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </Typography>
    </div>
  )
}