import React, { useState } from "react";
import {useNavigate,useParams } from 'react-router-dom';
import MyParticleElement from "./MyParticle";

function Upload({ randomId }) {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [hover, setHover] = useState(false);
  const [startassessment, setstartassessment] = useState(false);
  const { id } = useParams();

  const handleResumeUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setResume(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    setResume(uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      fetch(`http://127.0.0.1:5000/job/${id}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server if needed
          alert(data.message);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error("Error:", error);
        });
    }
  };

  const handleStartAssessment = () => {
    if (resume !== null && startassessment) {
      navigate(`/quiz/${id}`);
    } else {
      alert("Upload your resume first");
    }
  };

  const handleClick = () => {
    setHover((prevHover) => !prevHover);
  };

  const handleAssessment = () => {
    setstartassessment((prev) => !prev);
  };

  return (
    <>
      <MyParticleElement />
      <div>
        <div className="nine" style={{ padding: "40px" }}>
          <h1>
            Intelli Hire
            <span>
              Making the process of finding talent simpler, efficient, and
              quicker
            </span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="images"
            className="drop-container"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              id="images"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              required
            />
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <button
              type="submit"
              className="submit-button"
              onClick={handleAssessment}
            >
              Upload Resume
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            gap: "10px",
            alignItems: "end",
          }}
        >
          {hover && (
            <div className="rules">
              Rules:
              <br />
              1. You will encounter 10 aptitude-based questions.
              <br />
              2. You have only one opportunity to answer each question.
              <br />
              3. Each question has a time limit of 30 seconds.
              <br />
            </div>
          )}
          <button
            type="button"
            className="submit-button"
            onClick={handleStartAssessment}
            style={{ backgroundColor: "#f5287c" }}
          >
            Start Skill Assessment
          </button>
          <svg
            onClick={handleClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            style={{ width: "30px", height: "30px", color: "#f5287c" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default Upload;
