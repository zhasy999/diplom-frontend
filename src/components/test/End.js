import React, { useEffect, useState } from 'react';
import axios from "axios";
const End = ({ results, data, onReset, onAnswersCheck }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  function deleteSession() {
    axios.delete(`http://localhost:8080/api/test/deleteSession`);
  }
  useEffect( async () => {
    await deleteSession();
    let correct = 0;
    results.forEach((result, index) => {
      // if(result.answer === data[index].options) {
      //   correct++;
      // }
      const currentQuestionRightOption = data[index].options.find(option => option.correct)
      if (currentQuestionRightOption.text === result.answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>{correctAnswers} of {data.length}</p>
          <p><strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong></p>
          <button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button>
          <button className="button is-success" onClick={onReset}>Try again</button>
        </div>
      </div>
    </div>
  );
}

export default End;