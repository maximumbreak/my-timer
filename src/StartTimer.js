import React, { useState, useRef, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
import Timer from './Timer'

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1.2rem;
  margin: 1em;
  padding: 0.5em 2em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

function StartTimer({ sec, title, subTitle, date }) {
  const [start, setStart] = useState(false)
  const count = sec
  if (!start)
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
        </p>
        <Button style={{ marginTop: '-100px' }} onClick={() => setStart(true)}>
          Start
        </Button>
      </>
    )
  else {
    return <Timer sec={sec} title={title} subTitle={subTitle} date={date} />
  }
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

export default StartTimer
