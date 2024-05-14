// TutorsList.jsx

import React from "react";
import "./TutorMain.css";
import TutorsList from "./TutorLists";

const TutorMain = () => {
  return (
    <>
      <div id="FindATutor" className="header">
        <h1>-FIND YOUR TUTOR-</h1>
      </div>
      <div className="section">
        <div className="tut">
          <TutorsList />
        </div>
        <div className="tutnav">
          <p>THIS IS THE NAVIGATION</p>
        </div>
      </div>
    </>
  );
};

export default TutorMain;
