import classes from './VideoScreen.module.css'
import videoMp4 from '../Assets/volvoVideo.mp4'
import videoWebm from '../Assets/volvoVideo.webm'
import { Link } from 'react-router-dom'

export default function VideoScreen(props) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <video autoPlay muted loop className='video'>
          <source src={videoMp4} type='video/mp4'/>
          <source src={videoWebm} type='video/webm'/>
        </video>
        <Link to={'/form'}>asd</Link>
      </div>
    </div>
  )
}