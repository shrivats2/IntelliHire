import React from 'react';
import Feature from '../utils/feature';
import './aboutintellihire.css';

const AboutIntellihire = () => (
  <div className="intelli-hire__whatgpt3 section__margin" id="abt">
    <div className="intelli-hire__whatgpt3-feature">
    <Feature title="What is Intelli Hire" text="Intelli Hire is an innovative AI-powered platform that revolutionizes the hiring process. It harnesses cutting-edge algorithms to meticulously analyze candidate's resumes, meticulously assessing their projects, skills, work experience, cultural compatibility, and aptitude." />    </div>
    <div className="intelli-hire__whatgpt3-heading">
    <h1 className="gradient__text">Unlock the Potential of Intelli Hire</h1>
      <p>Discover the Possibilities</p>
    </div>
    <div className="intelli-hire__whatgpt3-container">
    <Feature title="Efficient Hiring" text="Say goodbye to manual screening and save time. Intelli Hire makes the process 10x faster and smoother by leveraging AI to evaluate candidate resumes and provide instant results." />
      <Feature title="Customizable Evaluation" text="Tailor the evaluation criteria to your needs. Intelli Hire's dashboard allows recruiters to modify parameters and weighting factors, giving you full control over the hiring process." />
      <Feature title="Real-Time Insights" text="Stay informed with real-time data. Intelli Hire provides recruiters with a dashboard to track the number of candidates who have applied for a job and how many have been selected for further interview rounds." />
    </div>
  </div>
);

export default AboutIntellihire ;