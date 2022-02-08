import { Link, useNavigate } from 'react-router-dom'
import bg from '../Assets/promozone.png'
import closeButtonImg from '../Assets/closeButton.svg'
import { useRef, useEffect, useState } from 'react'

import InputMask from 'react-input-mask';
//КОМПОНЕНТ INPUTMASK ПОЗВОЛЯЕТ СОХРАНЯТЬ МАСКУ ПРИ ВВОДЕ ТЕЛЕФОНА НАПРЯМУЮ В ИНПУТ

import classes from './FormScreen.module.css'
// CSS-МОДУЛИ


export default function FormScreen() {



  //СНИМАЕМ СТИЛИ, ПРИМЕНЯЕМЫЕ К ВЫБРАННЫМ СТРЕЛКОЙ КНОПКАМ, КОГДА ДВИГАЕМ МЫШКОЙ
  const mouseMoved = () => {
    if (document.activeElement.id !== inputRef.current.props.id) {
      document.activeElement.blur();
    }
  }

  //ДОБАВЛЯЕМ РЕФЫ ДЛЯ КНОПОК И СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ
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
    closeButtonRef = useRef(),
    checkboxRef = useRef(),
    [allValid, setAllValid] = useState(false),
    [numberValid, setNumberValid] = useState(true),
    [checkBoxValid, setCheckBoxValid] = useState(false)
  let navigate = useNavigate()

  // ДОБАВЛЯЕМ EVENTLISTENER-Ы ЧЕРЕЗ USEEFFECT С ПУСТЫМ МАССИВОМ ВО ВТОРОМ АРГУМЕНТЕ, ЧТОБЫ НЕ ДЕЛАТЬ ЭТО КАЖДЫЙ РАЗ ПРИ РЕРЕНДЕРЕ СТРАНИЦЫ
  useEffect(() => {
    window.addEventListener('keydown', keyHandler)
    window.addEventListener('mousemove', mouseMoved)
  },
    []
  )




  useEffect(() => {
    console.log(checkBoxValid + ' checkbox')
    console.log(!inputRef.current.value.includes('_') + ' number')
    // if (numberValid && checkBoxValid)    console.log('checkboxEFFECTCHANGED')
    if (!inputRef.current.value.includes('_') && checkBoxValid) {

      setAllValid(true)
    }
    else setAllValid(false)


    console.log(checkBoxValid + ' checkbox')
    console.log(!inputRef.current.value.includes('_') + ' number')
  },
    [checkBoxValid, numberValid]
  )



  //МАССИВ, "ЭМУЛИРУЮЩИЙ" СЕТКУ ТИПА GRID, ДЛЯ УДОБНОЙ НАВИГАЦИИ ПО ЭЛЕМЕНТАМ СТРЕЛКАМИ
  //КАЖДЫЙ ПОДМАССИВ МАССИВА - СТРОКА, СОДЕРЖАЩАЯ 3 ЭЛЕМЕНТА (3 КОЛОНКИ) 
  const buttonsArr = [
    [digit1Ref, digit2Ref, digit3Ref],
    [digit4Ref, digit5Ref, digit6Ref],
    [digit7Ref, digit8Ref, digit9Ref],
    [backSpaceRef, backSpaceRef, digit0Ref],
    [checkboxRef, checkboxRef, checkboxRef],
    [submitRef, submitRef, submitRef]
  ]

  // ОБЪЕКТ, ХРАНЯЩИЙ ДАННЫЕ О СТРОКЕ И КОЛОНКЕ АКТИВНОГО ЭЛЕМЕНТА 
  let activeButtonPos = {
    row: 0,
    column: 2
  }

  //ФУНКЦИЯ ДОБАВЛЯЕТ ЦИФРУ В ПЕРВЫЙ ПУСТОЙ СИМВОЛ (ЕСЛИ ТЕЛЕФОН НЕ ЗАПОЛНЕН)
  let curDigit = 4, arr = []
  const addDigit = function (x) {
    if (inputRef.current.value.includes('_')) {
      arr = inputRef.current.value.split('')
      for (let i = 0; i < arr.length; i++) {
        curDigit = i;
        setNumberValid(i)
        if (arr[i] == '_') {
          break;
        }
      }
      inputRef.current.setInputValue(inputRef.current.value.slice(0, curDigit) + x + inputRef.current.value.slice(curDigit + 1))
    }
  }

  //ИЩЕМ ПОСЛЕДНЮЮ ЦИФРУ И УДАЛЯЕМ (МЕНЯЕМ НА '_')
  const backSpace = function () {
    arr = inputRef.current.value.split('')
    for (let i = (arr.length - 1); i > 2; i--) {
      if (!isNaN(arr[i])) {
        console.log('backspaceFunctionLog')
        inputRef.current.setInputValue(inputRef.current.value.slice(0, i) + '_' + inputRef.current.value.slice(i + 1))
        break;
      }
    }
    setNumberValid(2)
  }


  // СВИТЧ ПРИ ВВОДЕ С КЛАВИАТУРЫ
  const keyHandler = (targetKey) => {
    console.log(targetKey.key)
    switch (targetKey.key) {


      //СТРЕЛКИ. МЕНЯЕМ РЯД/КОЛОНКУ АКТИВНОЙ КНОПКИ (НЕ ДАЛЬШЕ КРАЙНЕЙ) И ФОКУСИРУЕМСЯ НА НЕЙ
      case 'ArrowLeft':
        if (activeButtonPos.column != 0) activeButtonPos.column--;
        buttonsArr[activeButtonPos.row][activeButtonPos.column].current.focus()
        break;
      case 'ArrowUp':
        if (activeButtonPos.row != 0) activeButtonPos.row--;
        buttonsArr[activeButtonPos.row][activeButtonPos.column].current.focus()
        break;
      case 'ArrowRight':
        if (activeButtonPos.column != 3) activeButtonPos.column++;
        if (activeButtonPos.row == 3 && activeButtonPos.column != 2) activeButtonPos.column++;
        buttonsArr[activeButtonPos.row][activeButtonPos.column].current.focus()
        break;
      case 'ArrowDown':
        if (activeButtonPos.row != 5) activeButtonPos.row++;
        buttonsArr[activeButtonPos.row][activeButtonPos.column].current.focus()
        break;


      //BACKSPACE. УДАЛЯЕМ 1 ЦИФРУ, ЕСЛИ ПОЛЕ ИНПУТА НЕ В ФОКУСЕ
      case 'Backspace':
        if (document.activeElement.id !== inputRef.current.props.id) {
          backSpace()
        }
        break;


      //ЦИФРЫ. ДОБАВЛЯЕМ, ЕСЛИ ИНПУТ НЕ В ФОКУСЕ
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

      //ENTER: КЛИКАЕМ НА ЧЕКБОКС, ЕСЛИ ОН В ФОКУСЕ
      case 'Enter':
        if (activeButtonPos.row == 4) {
          buttonsArr[activeButtonPos.row][activeButtonPos.column].current.click()
        }
        break;

      default: break;
    }
  }

  const closeButton = () => {
    navigate('/')
  }


  // КОНСОЛЬНЫЕ ТЕСТЫ
  // console.log(inputRef)

  return (

    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.form__wrapper}>

          <div className={classes.form__content}>
            <p className={classes.header}>Введите ваш номер мобильного телефона</p>


            <InputMask ref={inputRef} id='inputinput' mask="+7(999)999-99-99" alwaysShowMask='1' className={classes.phone} />
            <p className={classes.desc}>и с Вами свяжется наш менеждер для дальнейшей консультации </p>


            <div className={classes.nums}>
              <button ref={digit1Ref} onClick={() => addDigit(1)}>1</button>
              <button ref={digit2Ref} onClick={() => addDigit(2)}>2</button>
              <button ref={digit3Ref} onClick={() => addDigit(3)}>3</button>
              <button ref={digit4Ref} onClick={() => addDigit(4)}>4</button>
              <button ref={digit5Ref} onClick={() => addDigit(5)}>5</button>
              <button ref={digit6Ref} onClick={() => addDigit(6)}>6</button>
              <button ref={digit7Ref} onClick={() => addDigit(7)}>7</button>
              <button ref={digit8Ref} onClick={() => addDigit(8)}>8</button>
              <button ref={digit9Ref} onClick={() => addDigit(9)}>9</button>
              <button ref={backSpaceRef} className={classes.backSpace} onClick={() => backSpace()}>СТЕРЕТЬ</button>
              <button ref={digit0Ref} onClick={() => addDigit(0)}>0</button>
            </div>
            <div className={classes.agreement}>
              <input ref={checkboxRef} type="checkbox" className={classes.checkbox} onChange={() => setCheckBoxValid(!checkBoxValid)} />
              <p>Согласие на обработку<br />персональных данных</p>
            </div>
            <button ref={submitRef} className={classes.sumbit} disabled={!allValid} onClick={() => { navigate('/thankyou') }}>Подтвердить номер</button>


          </div>
        </div>
        <div className={classes.background}>
          <img src={bg} alt="" />
        </div>

        <div ref={closeButtonRef} className={classes.closeButton} onClick={() => closeButton()}>
          <img src={closeButtonImg} alt="" />
        </div>

      </div>
    </div>
  )
}