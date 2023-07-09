import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Upload from "./components/candidate/upload";
import Quiz from "./components/candidate/quiz";
import Result from "./components/candidate/result";
import MyParticleElement from "./components/candidate/MyParticle";
import Navbar from "./components/Navbar/Navbar";
import UnknownTerritory from "./components/errorpg";
import Signup from "./components/signup/signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/dashboard";
import Home from "./components/home/home";
import ApplicantDetails from "./components/candidate/candidate_detail";
import JobDetailsPage from "./components/dashboard/job_table/Job_details_Candidatepage";


function App() {
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };
  const randomId = generateRandomId();

  return (
    <div className="app">
      <BrowserRouter>
        {/* <MyParticleElement /> */}
        <div className="gradient__bg">
           <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/:jobId" element={<JobDetailsPage/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/job/:id" element={<ApplicantDetails/>} />
          <Route path="/upload/:id" element={<Upload randomId={randomId}/>}/>
          <Route
            path={"/quiz/:id"}
            element={<Quiz randomId={randomId} />}
          />
          <Route path="/result/:id" element={<Result randomId={randomId} />} />
          <Route path="*" element={<Navigate to="/unknown-territory" />} />
          <Route path="/unknown-territory" element={<UnknownTerritory />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
