import React, { useEffect, useState } from "react";
import {useNavigate,useParams } from 'react-router-dom';

const Quiz = ({ randomId }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/job/${id}/quiz`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      handleNextQuestion();
    }
  }, [secondsLeft]);

  const handleAnswerSelection = (questionId, selectedChoice) => {
    const question = questions.find((q) => q._id === questionId);
    if (question && question.answer === selectedChoice) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSecondsLeft(30);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const scoreData = { score };
    fetch(`http://127.0.0.1:5000/job/${id}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreData),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/result/${id}`);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="nine" style={{ padding: "40px" }}>
        <h1>
          Skill Assessment
          <span>Unlock Your Potential: Discover, Develop, Excel!</span>
        </h1>
      </div>
      <div className="quiz-container">
        <div className="timer">
          <svg
            style={{ width: "40px", height: "40px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>

          <span className="timer-left">
            Time left ~
            <span
              className="timer"
              style={{ color: "red", fontStyle: "oblique", fontSize: "20px" }}
            >
              {secondsLeft} seconds
            </span>
          </span>
        </div>
        {currentQuestion && (
          <div key={currentQuestion._id} className="question-container">
            <h3 className="question">
              Q{currentQuestionIndex + 1}-{currentQuestion.question}
            </h3>
            <ul className="choices">
              {currentQuestion.choices.map((choice, index) => (
                <li key={index} className="choice">
                  <input
                    type="radio"
                    id={choice}
                    name={currentQuestion._id}
                    value={choice}
                    onChange={() =>
                      handleAnswerSelection(currentQuestion._id, choice)
                    }
                  />
                  <label htmlFor={choice}>{choice}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default Quiz;
