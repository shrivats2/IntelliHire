import React, { useEffect, useState } from "react";
import {useNavigate,useParams } from 'react-router-dom';

const Result = (randomId) => {
  const [finalverdict, setFinalVerdict] = useState({});
  const [score,setscore]=useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const handleBackNavigation = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [navigate]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/job/${id}/result`)
      .then((res) => res.json())
      .then((data) => {
        setFinalVerdict(data);
        setscore(data.score);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        height: "100vh",
        background: "white",
      }}
    >
      {score !== null ? (
        <main class="dashboard-container">
          <div class="dashboard">
            <h1 class="dashboard__header">Your Result</h1>
            <div class="dashboard__score">
              <h2 id="score-number" class="score-number">
                {finalverdict.score}
              </h2>
              <p class="score-text">of 10</p>
            </div>
            <div class="dashboard__grade">
              <h2 class="grade-text"></h2>
              <h3 class="grade-description">
                
              </h3>
            </div>
          </div>
          <div class="summary">
            <h1 class="summary__header">Summary</h1>
            <div id="summary__category">
              Based on the evaluation of your resume and skill assessment, we
              have determined that you have achieved a{" "}
              {finalverdict.candidate_score}% match.
              <div style={{height:"30px"}}></div>
              {finalverdict.selection === true ? (
                <div>
                  Therefore, we are pleased to inform you that we have decided
                  to proceed with your application. You will soon receive an
                  email from us detailing the next steps of the selection
                  process.
                </div>
              ) : (
                <div>
                  Regrettably, after careful consideration, we have decided not
                  to proceed further with your application. However, we would
                  like to extend our best wishes to you for all your future
                  endeavors.
                </div>
              )}
            </div>
            <button class="continue" type="button">
              Continue
            </button>
          </div>
        </main>
      ) : (
        <div className="loader">
          <div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#ff31a9" }}>
            Preparing Verdict...
          </p>
        </div>
      )}
    </div>
  );
};

export default Result;
