
import classes from './FormScreen.module.css'
import { Link } from 'react-router-dom'
import bg from '../Assets/promozone.png'
import { useState, useRef, useEffect, useFocus, focus } from 'react'
import InputMask from 'react-input-mask';



export default function FormScreen(props) {

  useEffect(() => {
    window.addEventListener('keydown', keyPressed)
    window.addEventListener('mousemove', mouseMoved)
  },
    []
  )

  const mouseMoved = () {
    
  }
  let curDigit = 4, arr = []
  const
    inputRef = useRef(),
    digit1Ref = useRef(),
    digit2Ref = useRef(),
    digit3Ref = useRef(),
    digit4Ref = useRef(),
    digit5Ref = useRef(),
    digit6Ref = useRef(),
    digit7Ref = useRef(),
    digit8Ref = useRef(),
    digit9Ref = useRef(),
    backSpaceRef = useRef(),
    digit0Ref = useRef(),
    submitRef = useRef(),
    checkboxRef = useRef();

  const buttonsArr = [
    [digit1Ref, digit2Ref, digit3Ref],
    [digit4Ref, digit5Ref, digit6Ref],
    [digit7Ref, digit8Ref, digit9Ref],
    [backSpaceRef, backSpaceRef, digit0Ref],
    [checkboxRef, checkboxRef, checkboxRef],
    [submitRef, submitRef, submitRef]
  ]

  let rowColumn = {
    row: 0,
    column: 2
  }

  let activeButton = digit1Ref;
  const findCurDigit = () => {
    arr = inputRef.current.value.split('')
    all: for (let i = 0; i < arr.length; i++) {
      curDigit = i;
      if (arr[i] == '_') {
        break all;
      }
    }
    // console.log(curDigit);
  }

  const addDigit = function (x) {
    if (inputRef.current.value.includes('_')) {
      findCurDigit()
      inputRef.current.setInputValue(inputRef.current.value.slice(0, curDigit) + x + inputRef.current.value.slice(curDigit + 1))
      curDigit++
    }
  }

  const backSpace = function () {
    arr = inputRef.current.value.split('')
    all: for (let i = (arr.length - 1); i > 2; i--) {
      if (!isNaN(arr[i])) {
        console.log('backspaceFunctionLog')
        inputRef.current.setInputValue(inputRef.current.value.slice(0, i) + '_' + inputRef.current.value.slice(i + 1))
        break all;
      }
    }
  }


  const keyPressed = (targetKey) => {
    console.log(targetKey.key)
    switch (targetKey.key) {
      case 'ArrowLeft':
        if (rowColumn.column != 0) rowColumn.column--;
        buttonsArr[rowColumn.row][rowColumn.column].current.focus()
        break;
      case 'ArrowUp':
        if (rowColumn.row != 0) rowColumn.row--;
        buttonsArr[rowColumn.row][rowColumn.column].current.focus()
        break;
      case 'ArrowRight':
        if (rowColumn.column != 2) rowColumn.column++;
        if (rowColumn.row == 3 && rowColumn.column != 2) rowColumn.column++;
        buttonsArr[rowColumn.row][rowColumn.column].current.focus()
        break;
      case 'ArrowDown':
        if (rowColumn.row != 5) rowColumn.row++;
        buttonsArr[rowColumn.row][rowColumn.column].current.focus()
        break;
      case 'Backspace':
        if (document.activeElement.id !== inputRef.current.props.id) {
          backSpace()
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        if (document.activeElement.id !== inputRef.current.props.id) {         
        addDigit(targetKey.key)
        }
        break;
      case 'Enter':
        if (rowColumn.row == 4){
        buttonsArr[rowColumn.row][rowColumn.column].current.click()
      }
        break;
      default: break;
    }
  }

  return (

    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.form__wrapper}>
          <div className={classes.form__content}>
            <p className={classes.header}>Введите ваш номер мобильного телефона</p>


            <InputMask ref={inputRef} id='inputinput' mask="+7(999)999-99-99" alwaysShowMask='1' className={classes.phone} />
            <p className={classes.desc}>и с Вами свяжется наш менеждер для дальнейшей консультации </p>


            <div className={classes.nums}>
              <button ref={digit1Ref}  onClick={() => addDigit(1)}>1</button>
              <button ref={digit2Ref}  onClick={() => addDigit(2)}>2</button>
              <button ref={digit3Ref}  onClick={() => addDigit(3)}>3</button>
              <button ref={digit4Ref}  onClick={() => addDigit(4)}>4</button>
              <button ref={digit5Ref}  onClick={() => addDigit(5)}>5</button>
              <button ref={digit6Ref}  onClick={() => addDigit(6)}>6</button>
              <button ref={digit7Ref}  onClick={() => addDigit(7)}>7</button>
              <button ref={digit8Ref}  onClick={() => addDigit(8)}>8</button>
              <button ref={digit9Ref}  onClick={() => addDigit(9)}>9</button>
              <button ref={backSpaceRef}  className={classes.backSpace} onClick={() => backSpace()}>СТЕРЕТЬ</button>
              <button ref={digit0Ref}  onClick={() => addDigit(0)}>0</button>
            </div>
            <div className={classes.agreement}>
              <input ref={checkboxRef} type="checkbox" className={classes.checkbox} />
              <p>Согласие на обработку<br />персональных данных</p>
            </div>
            <button ref={submitRef} className={classes.sumbit}>Подтвердить номер</button>
          </div>
        </div>
        <div className={classes.background}>
          <img src={bg} alt="" />
        </div>
      </div>
    </div>
  )
}