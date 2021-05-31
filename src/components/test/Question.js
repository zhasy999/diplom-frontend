import React, { useState, useEffect, useRef } from 'react';
import { formatTime } from '../../utils';
import axios from "axios";
const Question = ({ data, onAnswerUpdate, winStreak, setWinStreak, onSetStep, setTime, time, questionCounter, setQuestionCounter, setLevel, level, startLevel, up, setUp, down, setDown, setLevelsList, levelsList }) => {
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
    setTime(0)
    onAnswerUpdate(prevState => [...prevState, { description: data.description, answer: selected }]);

    const updatedWinStreak = await setWinStreak(question.correct ? winStreak + 1 : winStreak - 1)
    const updatedQuestionCounter = questionCounter + 1

    function upRange(a, b) {
      let sum = 0;
      for (let i = a; i <= b; i++) {
        sum += i
      }
      setLevelsList([...levelsList, Math.ceil(sum / (b - a + 1))])
      if (levelsList.includes(Math.ceil(sum / (b - a + 1)))) {
        onSetStep(3);
        return
      }
      setLevel(Math.ceil(sum / (b - a + 1)))
    }

    function downRange(a, b) {
      let sum = 0;
      for (let i = a; i >= b; i--) {
        sum += i
      }
      setLevelsList(prevState => [...prevState, Math.floor(sum / (a - b + 1))])
      if (levelsList.includes(Math.floor(sum / (a - b + 1)))) {
        onSetStep(3);
        return
      }
      setLevel(Math.floor(sum / (a - b + 1)))
    }


    if (updatedWinStreak === 2) {
      // level up, clear winstreak
      if (level === 6) {
        setLevel(level + 1)
      } else {
        upRange(level, up);
      }
      setWinStreak(0)
      await setQuestionCounter(0)
      await setDown(level)
      if (level + 1 === 8) {
        onSetStep(3)
        return
      }

    } else if (updatedWinStreak === -2) {
      // level down, clear winstreak
      if (level === 2) {
        setLevel(level - 1)
      } else {
        console.log(down);
        downRange(level, down)

      }
      setWinStreak(0)
      setQuestionCounter(0)
      setUp(level)
      if (level - 1 === 0) {
        onSetStep(3)
        return
      }
    } else if (updatedQuestionCounter === 3) {
      //level down, clear winstreak, clear question counter
      if (updatedWinStreak === 1) {

        // if (level ===  - 1) {
        //   setLevel(level + 1)
        // } else {
        //   // upRange(level, range)
        // }
        if (level + 1 === 8) {
          onSetStep(3)
          return
        }
      } else if (updatedWinStreak === -1) {

        if (level === 2) {
          setLevel(level - 1)
        } else {
          downRange(level)
        }
        if (level - 1 === 0) {
          onSetStep(3)
          return
        }
      }
      setWinStreak(0)
      setQuestionCounter(0)
    } else {
      setQuestionCounter(questionCounter + 1)
    }
    setSelected('');
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
          <p><strong>Current level:</strong> {level}</p>
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