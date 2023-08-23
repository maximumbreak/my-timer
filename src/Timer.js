import React, { useState, useRef, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function Timer({ sec, title, subTitle, date }) {
  const [count, setCount] = useState(sec)

  useInterval(() => {
    if (count > 0) setCount(count - 1)
  }, 1000)
  return (
    <>
      <span style={{ fontSize: '10rem' }}>{title}</span>
      <span style={{ fontSize: '2rem' }}>{subTitle}</span>
      <span style={{ fontSize: '2rem', marginBottom: '-80px' }}>{date}</span>
      <p>
        {count > 0 && (
          <span style={{ fontSize: '20rem' }}>
            {Math.trunc(count / 60) < 10 ? '0' : ''}
            {Math.trunc(count / 60)}:{count % 60 < 10 ? '0' : ''}
            {count % 60}
          </span>
        )}
        {count === 0 && (
          <span style={{ fontSize: '18rem', color: '#b93434' }}>หมดเวลา</span>
        )}
      </p>
    </>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default Timer
