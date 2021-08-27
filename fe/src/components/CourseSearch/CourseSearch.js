import { Button, Container, TextField, Typography } from '@material-ui/core'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useState } from 'react'
import { Playlist } from './Playlist'
import api from '../../api'
import './CourseSearch.css'

export function CourseSearch() {
  const [query, setQuery] = useState('')
  const [playlists, setPlaylists] = useState({err: 0, playlists: []})

  var onQueryChange = (e) => {
    setQuery(e.target.value)
  }
  var getResultsKey = (e) => {
    if (e.code === 'Enter')
      getResults(e)
  }
  var getResults = (e) => {
    console.log('Querying for \'' + query + '\'')
    api.sendQuery(query).then(lists => {
      if (lists.status < 400) {
        setPlaylists(lists.data)
      }
      else {
        setPlaylists({ err: 1, playlists: []})
        console.log('failed')
      }
    })
  }

  return (
    <div>
      <div className='title'>
        <Container>
          <Typography variant='h6'>What do you want to learn about today?</Typography>
          <TextField onChange={onQueryChange} onKeyPress={getResultsKey} id='finder'/>
          <Button onClick={getResults}><KeyboardReturnIcon /></Button>
        </Container>
        {playlists.err === 0 ? 
          <Typography>Get started by entering a search term above. A course will be generated for you.</Typography> :
          <Typography color='error'>Either nothing was found or an error occurred. Please try again.</Typography>
        }
      </div>
      <div className='courses'>
        <Container>
          <table>
            {playlists.playlists.map(playlist => {
              console.log(playlist)
              return (<Playlist playlist={playlist}/>)
            })}
          </table>
        </Container>
      </div>
    </div>
  )
}