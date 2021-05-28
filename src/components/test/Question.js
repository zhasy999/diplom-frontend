import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../../utils';
import axios from "axios";
const Question = ({ data, onAnswerUpdate, winStreak, setWinStreak, onSetStep, time, questionCounter, setQuestionCounter, setLevel, level, startLevel }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  }
  function inputSession(questionId, optionId, duration, point) {
    return axios.post(`http://localhost:8080/api/test/insertSession?questionId=${questionId}&optionId=${optionId}&duration=${duration}&point=${point}`);
  }

  const nextClickHandler = async (e) => {
    if (selected === '') {
      return setError('Please select one option!');
    }
    const question = data.options.find(q => q.text === selected)

    await inputSession(data.id, question.id, time, question.correct)
    onAnswerUpdate(prevState => [...prevState, { description: data.description, answer: selected }]);

    const updatedWinStreak = await setWinStreak(question.correct ? winStreak + 1 : winStreak - 1)
    const updatedQuestionCounter = questionCounter + 1
    console.log(updatedQuestionCounter);
    if (updatedWinStreak === 2) {
      // level up, clear winstreak
      if (level < startLevel) {
        onSetStep(3)
        return
      }
      setLevel(level + 1)
      setWinStreak(0)
      await setQuestionCounter(0)
      console.log(level);
      if(level===7){
        onSetStep(3)
        return
      }
    } else if (updatedWinStreak === -2) {
      // level down, clear winstreak
      // console.log(1112);
      setLevel(level - 1)
      setWinStreak(0)
      setQuestionCounter(0)

    } else if (updatedQuestionCounter === 3) {
      //level down, clear winstreak, clear question counter
      if(updatedWinStreak===1){
        setLevel(level + 1)
      }else if(updatedWinStreak===-1){
        setLevel(level + 1)
      }
      setWinStreak(0)
      setQuestionCounter(0)
      if(level===7){
        onSetStep(3)
        return
      }
    } else {
      setQuestionCounter(questionCounter + 1)
    }


    setSelected('');
    // if(activeQuestion < numberOfQuestions - 1) {
    //   onSetActiveQuestion(activeQuestion + 1);
    //   setTime(0);
    // }else {
    //   onSetStep(3);
    // }
  }

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.description}</h2>
          <p><strong>Your time:</strong> {formatTime(time)}</p>
          <div className="control" ref={radiosWrapper}>
            {data.options.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice.text} onChange={changeHandler} />
                {choice.text}
              </label>
            ))}
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="button is-link is-medium is-fullwidth mt-4" onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;