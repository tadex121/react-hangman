import React, { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

function App() {
  const besede = ['react', 'javascript', 'css', 'html', 'vue']
  const črke = [
    'a',
    'b',
    'c',
    'č',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'r',
    's',
    'š',
    't',
    'u',
    'v',
    'z',
  ]

  const [correct, setCorrect] = useState([])
  const [wrong, setWrong] = useState([])
  const [selectedWord, setSelectedWord] = useState('')

  const zamaskiranaBeseda = selectedWord
    .split('')
    .map((letter) => (correct.includes(letter) ? letter : '__'))
    .join(' ')

  const errors = wrong.length
  const randomWord = besede[Math.floor(Math.random() * besede.length)]
  useEffect(() => {
    setSelectedWord(randomWord)
  }, [])

  return (
    <Container>
      <div className='d-flex justify-content-center p-5'>
        <div className='wrapper'>
          <div className='static-word'>Who Am I?</div>
          <ul className='moving-text'>
            <li>
              <span>I'm programming language</span>
            </li>
          </ul>
        </div>
      </div>
      <p className='crke d-flex justify-content-center p-4'>
        {zamaskiranaBeseda}
      </p>

      {črke.map((črka, index) => {
        return (
          <button
            className='words mt-4'
            key={index}
            onClick={() => {
              if (selectedWord.includes(črka)) {
                setCorrect([...correct, črka])
              }

              if (!selectedWord.includes(črka)) {
                setWrong([...wrong, črka])
              }
            }}
          >
            {črka}
          </button>
        )
      })}

      <div className='d-flex justify-content-center'>
        {!zamaskiranaBeseda.includes('_') && (
          <>
            <div className='modal-container'></div>
            <div className='modal-content'>
              <p>You won!</p>
              <button
                className='restart'
                onClick={() => {
                  setCorrect([])
                  setWrong([])
                  setSelectedWord(
                    besede[Math.floor(Math.random() * besede.length)]
                  )
                }}
              >
                Restart
              </button>
            </div>
          </>
        )}
      </div>
      <div className='d-flex justify-content-center'>
        {errors > 5 && (
          <>
            <div className='modal-container'></div>
            <div className='modal-content'>
              <p>You lost!</p>
              <button
                className='restart'
                onClick={() => {
                  setCorrect([])
                  setWrong([])
                  setSelectedWord(
                    besede[Math.floor(Math.random() * besede.length)]
                  )
                }}
              >
                Restart
              </button>
            </div>
          </>
        )}
      </div>

      <div className='d-flex justify-content-center m-5'>
        <svg height='250' width='200' className='figura'>
          {/* <!-- Rod --> */}
          <line x1='60' y1='20' x2='140' y2='20' />
          <line x1='140' y1='20' x2='140' y2='50' />
          <line x1='60' y1='20' x2='60' y2='230' />
          <line x1='20' y1='230' x2='100' y2='230' />

          {/* <!-- Head --> */}
          {errors > 0 && <circle cx='140' cy='70' r='20' />}
          {/* <!-- Body --> */}
          {errors > 1 && <line x1='140' y1='90' x2='140' y2='150' />}
          {/* <!-- Arms --> */}
          {errors > 2 && <line x1='140' y1='120' x2='120' y2='100' />}
          {errors > 3 && <line x1='140' y1='120' x2='160' y2='100' />}
          {/* <!-- Legs --> */}
          {errors > 4 && <line x1='140' y1='150' x2='120' y2='180' />}
          {errors > 5 && <line x1='140' y1='150' x2='160' y2='180' />}
        </svg>
        <div className='d-flex align-items-center mx-5'>
          <h4>Wrong words:</h4>
          {wrong
            .map((črka, index) => (
              <div className='wrong-word' key={index}>
                {črka}
              </div>
            ))
            .reduce(
              (prev, curr) => (prev === null ? [curr] : [prev, ', ', curr]),
              null
            )}
        </div>
      </div>
    </Container>
  )
}

export default App
