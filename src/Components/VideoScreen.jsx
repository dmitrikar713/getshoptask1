import classes from './VideoScreen.module.css'
import videoMp4 from '../Assets/volvoVideo.mp4'
import videoWebm from '../Assets/volvoVideo.webm'
import { useNavigate } from 'react-router-dom'
import { useRef} from 'react'
import goButtonImg from '../Assets/goButton.png'

export default function VideoScreen(props) {
  
  const goButtonRef = useRef()

  let navigate = useNavigate()
  const goButton = () => {
    navigate('/form')
  }



  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <video autoPlay muted loop className='video'>
          <source src={videoMp4} type='video/mp4'/>
          <source src={videoWebm} type='video/webm'/>
        </video>
        <div ref={goButtonRef} className={classes.goButton} onClick={() => goButton()}>
          <img src={goButtonImg} alt="" />
        </div>
      </div>
    </div>
  )
}