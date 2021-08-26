import './Playlist.css'

export function Playlist(playlist) {
  console.log(playlist.playlist.snippet)
  return (
    <tr>
      <th>
        <iframe
          width='230'
          height='150'
          src={'https://www.youtube.com/embed/videoseries?list='+playlist.playlist.id.playlistId}
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen>
        </iframe>
      </th>
      <th className='info'>
        <p>{playlist.playlist.snippet.title}</p>
        <p>{playlist.playlist.snippet.description}</p>
      </th>
    </tr>
  )
}