import React, { useState, useEffect } from "react";
import "./TutorRegistration.css";
import { useNavigate } from "react-router-dom";

function TutorRegistration() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [subjectsTaught, setSubjectsTaught] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [languages, setLanguages] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [githubAccount, setGithubAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const [isStep2Disabled, setIsStep2Disabled] = useState(true);
  const [isStep3Disabled, setIsStep3Disabled] = useState(true);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (name && location && dob && userPhoto && bio) {
      setIsStep2Disabled(false);
    } else {
      setIsStep2Disabled(true);
      setIsStep3Disabled(true);
    }
  }, [name, location, dob, userPhoto, bio]);

  useEffect(() => {
    if (subjectsTaught && qualifications && hourlyRate && languages) {
      setIsStep3Disabled(false);
    } else {
      setIsStep3Disabled(true);
    }
  }, [subjectsTaught, qualifications, hourlyRate, languages]);

  useEffect(() => {
    if (
      name &&
      location &&
      dob &&
      userPhoto &&
      subjectsTaught &&
      qualifications &&
      hourlyRate &&
      languages &&
      linkedinId &&
      githubAccount &&
      phoneNumber &&
      bio
    ) {
      setIsRegisterDisabled(false);
    } else {
      setIsRegisterDisabled(true);
    }
  }, [
    name,
    location,
    dob,
    userPhoto,
    subjectsTaught,
    qualifications,
    hourlyRate,
    languages,
    linkedinId,
    githubAccount,
    phoneNumber,
    bio,
  ]);

  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const handleRegister = async () => {
    const dataToSend = {
      name: name,
      location: location,
      dob: dob,
      userPhoto: userPhoto,
      subjectsTaught: subjectsTaught,
      qualifications: qualifications,
      hourlyRate: hourlyRate,
      languages: languages,
      linkedinId: linkedinId,
      githubAccount: githubAccount,
      phoneNumber: phoneNumber,
      bio: bio,
    };
    console.log(dataToSend);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      const response = await fetch(
        "http://localhost:8531/tutors",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to register tutor");
      }
      const data = await response.json();
      console.log("Tutor registered successfully:", data);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="vertical-header">Tutor Registration</h1>
      <div className="steps-indicator">
        <div
          className={`step-circle ${step === 1 ? "active" : ""}`}
          onClick={() => handleStepChange(1)}
        >
          1
        </div>
        <div
          className={`step-circle ${step === 2 ? "active" : ""}`}
          onClick={() => handleStepChange(2)}
          disabled={isStep2Disabled}
        >
          2
        </div>
        <div
          className={`step-circle ${step === 3 ? "active" : ""}`}
          onClick={() => handleStepChange(3)}
          disabled={isStep3Disabled}
        >
          3
        </div>
      </div>
      {step === 1 && (
        <div className="green-section">
          <h2>Personal Details</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <label>User Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUserPhoto(e.target.files[0])}
            />
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              cols={50}
              placeholder="Enter your bio here (min 200 characters)..."
            />
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="grey-section">
          <h2>Educational Details</h2>
          <div className="form">
            <label>Subjects Taught:</label>
            <input
              type="text"
              value={subjectsTaught}
              onChange={(e) => setSubjectsTaught(e.target.value)}
            />
            <label>Qualifications:</label>
            <input
              type="text"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
            />
            <label>Hourly Rate:</label>
            <input
              type="text"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
            />
            <label>Languages:</label>
            <input
              type="text"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="green-section">
          <h2>Socials</h2>
          <div className="form">
            <label>LinkedIn ID:</label>
            <input
              type="text"
              value={linkedinId}
              onChange={(e) => setLinkedinId(e.target.value)}
            />
            <label>Github Account:</label>
            <input
              type="text"
              value={githubAccount}
              onChange={(e) => setGithubAccount(e.target.value)}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="grey-section">
          <button onClick={handleRegister} disabled={isRegisterDisabled}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default TutorRegistration;
