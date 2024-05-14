// TutorCard.jsx

import React from "react";
import "./TutorCard.css"; // Import CSS file for styling
import { Link } from "react-router-dom";

const TutorCard = ({ tutor }) => {
  return (
    <Link className="dis" to="/">
      <div className="tutor-card">
        <div className="flex">
          <img src={tutor.image} alt={tutor.name} />
          <div className="info">
            <h3>{tutor.name}</h3>
            <p>{tutor.subject}</p>
            <p>{tutor.info}</p>
          </div>
          <p>{tutor.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default TutorCard;
