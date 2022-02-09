import { useNavigate } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import classes from './ThankYouScreen.module.css'
import Slider from 'react-slick'
import slide1 from '../Assets/slides/slide1.png'
import slide2 from '../Assets/slides/slide2.png'
import slide3 from '../Assets/slides/slide3.png'
import closeButtonImg from '../Assets/closeButton.svg'


export default function ThankYouScreen(props) {
  // РЕФЫ
  const sliderRef = useRef();
  const slideRef = useRef();
  const buttonsRef = useRef();
  const closeButtonRef = useRef()
  let navigate = useNavigate()
  
  // СМЕНА СЛАЙДОВ
  const next = () => {
    sliderRef.current.slickNext();
  }
  const previous = () => {
    sliderRef.current.slickPrev();
  }

// НАСТРОЙКИ КОМПОНЕНТА СЛАЙДЕРА
  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  // ФОКУСИРУЕМСЯ НА СЛАЙДЕРЕ И ДОБАВЛЯЕМ LISTENERS
  useEffect(() => {  
    buttonsRef.current.click(); 
    buttonsRef.current.focus(); 
    window.addEventListener('click', mouseActivity)
    window.addEventListener('mousemove', mouseActivity)
  },
    []
  )

  // ФОКУСИРУЕМСЯ НА СЛАЙДЕРЕ ВСЕГДА
  const mouseActivity = () => {
    buttonsRef.current.focus(); 
  }
  
  // EXIT
  const closeButton = () => {
    navigate('/')
  }

  return (<div className={classes.wrapper}>
    <div className={classes.content}>
      <Slider autoFocus  ref={sliderRef} className={classes.slider} {...settings}>
        <div  ref={buttonsRef}   className={classes.slider_element} key={1}>
          <img  ref={buttonsRef}   ref={slideRef} src={slide1} alt="" />
        </div>
        <div className={classes.slider_element} key={2}>
          <img ref={slideRef} src={slide2} alt="" />
        </div>
        <div className={classes.slider_element} key={3}>
          <img ref={slideRef} src={slide3} alt="" />
        </div>
      </Slider>
      <div className={classes.slider_buttons}>
        <button className="button" onClick={previous} />
        <button className="button" onClick={next} />
      </div>
      
      <button ref={closeButtonRef} className={classes.closeButton} onClick={() => navigate('/')} />
    </div>
  </div>
  )
}