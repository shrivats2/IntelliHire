import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from "axios";

import "./AddJobModal.css"; // Import CSS file for styling

const AddJobModal = ({ isOpen, setIsOpen }) => {
  const [flag, setFlag] = useState(false);
  const [jobId, setJobId] = useState("");
  const [buttontxt, setbuttontxt] = useState("Copy");

  const initialState = {
    job_title: "",
    jobDesc: "",
    education: "5",
    experience: "5",
    skills: "5",
    projects: "5",
    achievements: "5",
    coding_profiles: "5",
    testScore: "5",
  };
  const [formData, setFormData] = useState(initialState);

  // Create a new FormData object to store the form data
  const handleSubmit = async (event) => {
    event.preventDefault();

    const r_id = localStorage.getItem("r_id");

    const data = {
      job_title: formData.job_title,
      jd: formData.jobDesc,
      weights: [
        formData.education / 10,
        formData.experience / 10,
        formData.skills / 10,
        formData.projects / 10,
        formData.achievements / 10,
        formData.coding_profiles / 10,
        formData.testScore / 10,
      ],
      status: "Active",
      r_id,
    };
    console.log(data);
    const url = `http://127.0.0.1:5001/dashboard/${r_id}`;
    const res = await axios.post(url, data);
    console.log(res.status);
    if (res.status === 200) {
      setFlag(true);
      setJobId(res.data);
      setFormData(initialState);
    }
  };

  // Rest of your component code...

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlecopy = (e) => {
    setbuttontxt("Copied");
    setTimeout(() => setbuttontxt(buttontxt), [1000]);
    navigator.clipboard.writeText(e);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="add-job-modal">
          {flag ? (
            <>
              <h1 className="gradient__text" style={{ padding: "20px" }}>
                Job has been successfully posted. Share the following link with
                the candidates for hiring!!!
              </h1>
              <div className="modal-link">
                <a
                  className="modal-a"
                  style={{ paddingLeft: "30px", color: "blue" }}
                  href={`http://localhost:3000/job/${jobId}`}
                >
                  http://localhost:3000/job/{jobId}
                </a>
                <button
                  className="copy-button"
                  onClick={() =>
                    handlecopy(`http://localhost:3000/job/${jobId}`)
                  }
                >
                  {buttontxt}
                </button>
              </div>
            </>
          ) : (
            <div className="add-job-modal-content">
              <h2>Job Application</h2>
              <div className="form-group">
                <label htmlFor="jobDesc">Job Title:</label>
                <textarea
                  id="job_title"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobDesc">Job Description:</label>
                <textarea
                  id="jobDesc"
                  name="jobDesc"
                  value={formData.jobDesc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <h3>
                  Customize the Weightage of Parameters Based on Your Job
                  Requirements:
                </h3>
              </div>
              <div className="form-group">
                <label htmlFor="education">Education:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                />
                <span>{formData.education}</span>
              </div>
              <div className="form-group">
                <label htmlFor="experience">Experience:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
                <span>{formData.experience}</span>
              </div>
              <div className="form-group">
                <label htmlFor="skills">Skills:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                <span>{formData.skills}</span>
              </div>
              <div className="form-group">
                <label htmlFor="projects">Projects:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="projects"
                  name="projects"
                  value={formData.projects}
                  onChange={handleInputChange}
                />
                <span>{formData.projects}</span>
              </div>
              <div className="form-group">
                <label htmlFor="achievements">Achievements:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                />
                <span>{formData.achievements}</span>
              </div>
              <div className="form-group">
                <label htmlFor="projects">Coding Profiles:</label>
                <input
                  type="range"
                  className="slider"
                  min="1"
                  max="10"
                  id="coding_profiles"
                  name="coding_profiles"
                  value={formData.coding_profiles}
                  onChange={handleInputChange}
                />
                <span>{formData.coding_profiles}</span>
              </div>
              <div className="form-group">
                <label htmlFor="testScore">Test Score:</label>
                <input
                  type="range"
                  className="slider"
                  id="testScore"
                  name="testScore"
                  min="1"
                  max="10"
                  value={formData.testScore}
                  onChange={handleInputChange}
                />
                <span>{formData.testScore}</span>
              </div>
              <div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddJobModal;
