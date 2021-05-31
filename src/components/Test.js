import React, { useState, useEffect } from "react";
import Start from './test/Start';
import Question from './test/Question';
import End from './test/End';
import Modal from './test/Modal';
import quizData from '../data/quiz.json';
import UserService from "../services/user.service";
import { useAsyncState } from "../hooks/useAsyncState"
import axios from "axios";
import authHeader from "../services/auth-header";
import { ThemeProvider } from "styled-components";
const API_URL = "http://localhost:8080/api/test/";

let interval;
const Home = () => {
  const [content, setContent] = useState("");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  const [topics, setTopics] = useState([]);
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [winStreak, setWinStreak] = useAsyncState(0);
  const [questionCounter, setQuestionCounter] = useAsyncState(0);
  const [startLevel, setStartLevel] = useState(null);
  const [fullTime, setFullTime] = useState(0);
  const [levelsList, setLevelsList] = useState([4]);
  const [up, setUp] = useState(7);
  const [down, setDown] = useState(1);


  function getTopics() {
    axios.get("http://localhost:8080/api/test/topics").then(res => (setTopics(res.data)));
  }
  function getQuestion() {
    axios.get(`http://localhost:8080/api/test/question?topicId=${level}`).then(res => {
      axios.get(`http://localhost:8080/api/test/options?questionId=${res.data.id}`).then(res1 => {
        const question = {
          id: res.data.id,
          description: res.data.description,
          options: res1.data
        }
        setQuestions([...questions, question])
        setCurrentQuestion(question)
      }).catch(err => {
        console.log(1, err);
        // setStep(3)
      })
    }).catch(err => {
      console.log(2, err);
      setStep(3)
    })
  }
  // console.log(winStreak);
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
    getTopics();

  }, []);

  useEffect(() => {
    if (topics.length > 0) {
      const level = Math.round(topics.length / 2)
      setLevel(level)
      if (!startLevel) {
        setStartLevel(level)
        setLevelsList(prevState => [...prevState, level])
      }

    }
  }, [topics])

  // useEffect(() => {
  //   if (level) {
  //     getQuestion()
  //   }
  // }, [level, questionCounter])

  useEffect(() => {
    if (level && level === startLevel) {
      getQuestion()
    }
    if (level === 8 || level === 0) {
      console.log(level);
      setStep(3)
    }
  }, [level])


  useEffect(() => {
    if (level && questionCounter !== -2 && questionCounter !== 3) {
      getQuestion()
    }
  }, [questionCounter])

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
      setFullTime(prevTime => prevTime + 1)
    }, 1000);
  }

  const resetClickHandler = () => {
    window.location.reload()
  }
  return (
    <div className="container">
      <header className="jumbotron">
        <h1 className="bigh1">{content}</h1>
      </header>
      <body>
        {step === 1 && <Start onQuizStart={quizStartHandler} />}
        {step === 2 && <Question
          data={currentQuestion}
          onAnswerUpdate={setAnswers}
          winStreak={winStreak}
          onSetStep={setStep}
          setWinStreak={setWinStreak}
          time={time}
          setTime={setTime}
          level={level}
          setLevel={setLevel}
          questionCounter={questionCounter}
          setQuestionCounter={setQuestionCounter}
          startLevel={startLevel}
          up={up}
          setUp={setUp}
          down={down}
          setDown={setDown}
          setLevelsList={setLevelsList}
          levelsList={levelsList}
        />}
        {step === 3 && <End
          results={answers}
          data={questions}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          fullTime={fullTime}
          level={level}
          levels={topics.length}
        />}
        {showModal && <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={questions}
        />}
      </body>
    </div>
  );
};

export default Home;
