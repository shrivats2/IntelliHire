import React from 'react';
import Feature from '../utils/feature';
import './service.css';

const featuresData = [
{
title: 'Revolutionize Your Hiring Process',
text: 'Intelli Hire empowers you to revolutionize your hiring process using state-of-the-art AI technology. Say goodbye to traditional methods and embrace the future of hiring.',
},
{
title: 'Effortlessly Find the Perfect Candidates',
text: 'With Intelli Hire, finding the perfect candidates becomes effortless. Our advanced algorithms meticulously evaluate resumes, analyzing projects, skills, work experience, cultural fit, and aptitude to match you with the ideal candidates.',
},
{
title: 'Streamline Hiring with Speed and Accuracy',
text: "Streamline your hiring process with speed and accuracy. Intelli Hire's AI-powered platform makes the process 10x faster, ensuring you don't miss out on top talent.",
},
{
title: 'Stay Informed with Real-Time Insights',
text: 'Stay informed with real-time insights. Intelli Hire provides you with a comprehensive dashboard that tracks the number of applicants, selection progress, and customizable parameters, giving you full control over your hiring decisions.',
},
];

const Service = () => (

  <div className="intelli-hire__features section__padding" id="features">
    <div className="intelli-hire__features-heading">
    <h1 className="gradient__text">Experience the Power of AI in Hiring and Transform Your Recruitment Process</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="intelli-hire__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);
export default Service;