import React, { useState, useEffect } from "react";
import Start from './test/Start';
import Question from './test/Question';
import End from './test/End';
import Modal from './test/Modal';
import quizData from '../data/quiz.json';
import UserService from "../services/user.service";
// import './App.css';

let interval;
const Home = () => {
  const [content, setContent] = useState("");
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
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
  }, []);

  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }



  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <body>
        {step === 1 && <Start onQuizStart={quizStartHandler} />}
        {step === 2 && <Question
          data={quizData.data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
        />}
        {step === 3 && <End
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
        />}


        {showModal && <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={quizData.data}
        />}
      </body>
    </div>
  );
};

export default Home;
