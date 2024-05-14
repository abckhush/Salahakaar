// TutorsList.jsx

import React from "react";
import TutorCard from "./TutorCard";
import tutors from "../data/data";
import "./TutorLists.css";

const TutorsList = () => {
  return (
    <>
      <div className="tutors-list">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </>
  );
};

export default TutorsList;
