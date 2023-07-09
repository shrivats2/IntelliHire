import React, { useEffect, useState } from 'react';

import './dashboard.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import AddJobModal from './AddJobModal';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const r_id = localStorage.getItem("r_id");
    fetch(`http://127.0.0.1:5001/dashboard/${r_id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setJobs(data.data);
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
  },[])

  const buttonStyle = {
    '--clr': '#FF44CC'
  };

  return (
    <div className="dashboard-container dcntr">
      <h2>Job Dashboard</h2>
      <button className='add-new' onClick={() => setIsOpen(true)} style={buttonStyle}><span>Add New Job</span><i></i></button>
      <div className="card-container">
        {jobs.map((job) => (
            <div className="card" key={job._id} >
              <h3>{job.job_title}</h3>
              <p>Status: {job.status}</p>
              <Link style={{textDecoration:'none', color:'#000'}} to={`/dashboard/${job._id}`}>
                <button className='job-det' style={{textDecoration:'none',fontSize:'15px',backgroundColor:'#fff',padding:'10px 30px', borderRadius:'20px', fontStyle:'bold'}}>Job Details</button>
              </Link>
            </div>
          
        ))}
      </div>
      <AddJobModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );

};

export default Dashboard;
