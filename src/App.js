import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [backColor, setbackColor] = useState(null);
  const [questionData, setQuestionData] = useState([]);

  const handleAnswerOptionClick = (isCorrect, i) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setbackColor(i);
  };

  const moveNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionData.length) {
      setCurrentQuestion(nextQuestion);
      setbackColor(null);
    } else {
      setShowScore(true);
    }
  }

  useEffect(() => {
    axios.get('https://e619b48d-d6c4-4a41-b538-7c52d533c7f5.mock.pstmn.io/server-demo').then(function (data) {
      setQuestionData(data.data)
    })
  }, []);

  return (
    <div className='app'>
      {showScore ? (
        <div className='wrapper'>
          <div>
            <p className='userpoints'>You scored {score} out of {questionData.length}</p>
          </div>
        </div>
      ) : (
          <div className='wrapper'>
            <div className='quiz'>
              <div className='quiz_header'>
                <div className='quiz_user'>
                  <h4>Welcome! <span className='name'>user_name</span></h4>
                </div>
                <div className='quiz_timer'>
                  <span className='time'>00:00</span>
                </div>
              </div>

              <div className='quiz_body'>
                <h2><span className='questions'>Question {currentQuestion + 1}</span>/{questionData.length}<br></br>
                  {/* <span className='question-text'>{questions[currentQuestion].questionText}</span> */}
                  <span className='question-text'>{questionData.length ? questionData[currentQuestion].questionText : ''}</span>
                </h2>
                <div className='option_group'>
                  {questionData.length ? questionData[currentQuestion].answerOptions.map((answerOption, i) => (
                    <button style={{ backgroundColor: backColor === i ? '#341f97' : '', color: backColor === i ? '#fff' : '' }} className='option' onClick={() => handleAnswerOptionClick(answerOption.isCorrect, i)}>{answerOption.answerText}</button>
                  )) : null}
                </div>
                <button className="btn-next" onClick={() => moveNextQuestion()}>Next Question</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}