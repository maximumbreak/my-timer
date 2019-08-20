import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import StartTimer from './StartTimer';
import useForm from 'react-hook-form';
import styled from 'styled-components';

const Input = styled.input`
  color: palevioletred;
  font-size: 1.5rem;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? 'palevioletred' : 'white')};
  color: ${props => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

function App() {
  const { register, handleSubmit, errors } = useForm();
  const [start, setStart] = useState(false);
  const [mixSecond, setMixSecond] = useState(false);
  const [titleValue, setTitleValue] = useState();
  const [subTitleValue, setSubTitleValue] = useState();
  const [dateValue, setDateValue] = useState();

  const onSubmit = data => {
    const { minutes, seconds, title, subTitle, date } = data;
    const result = +minutes * 60 + +seconds;
    setMixSecond(result);
    setTitleValue(title);
    setSubTitleValue(subTitle);
    setDateValue(date);
    setStart(true);
  }; // callback when validation pass

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        หัวข้อ <Input name="title" ref={register({ required: true })} />
        <p />
        รายละเอียด{' '}
        <Input
          name="subTitle"
          style={{ width: '20rem' }}
          ref={register({ required: true })}
        />
        <p />
        วันที่ <Input name="date" ref={register({ required: true })} />
        <p />
        เวลา{' '}
        <Input
          style={{ width: '5rem' }}
          name="minutes"
          type="number"
          ref={register({ required: true })}
        />
        {' : '}
        <Input
          style={{ width: '5rem' }}
          type="number"
          name="seconds"
          ref={register({ required: true })}
        />
        <p />
        <Button type="submit">Submit</Button>
      </form>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        {start === false ? renderForm() : ''}
        {start && (
          <StartTimer
            sec={mixSecond}
            title={titleValue}
            subTitle={subTitleValue}
            date={dateValue}
          />
        )}
      </header>
    </div>
  );
}

export default App;
