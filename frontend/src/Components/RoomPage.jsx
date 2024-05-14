import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./RoomPage.css";

const RoomPage = () => {
  const { roomCode } = useParams();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isTutor, setIsTutor] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false); // State variable for submit success
  const reviewRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to your backend to fetch the user details
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8531/userdetails", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        // Set the userId and userName from the fetched data
        setUserId(userData.userId);
        setUserName(userData.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const checkIfUserIsTutor = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8531/check-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setIsTutor(data.isTutor);
      } catch (error) {
        console.error("Error checking if user is a tutor:", error);
      }
    };

    fetchUserData();
    checkIfUserIsTutor();
  }, []);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleReviewSubmit = async () => {
    // Check if rating and review are not empty
    if (!rating || !reviewRef.current.value.trim()) {
      alert("Please provide both rating and review before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log(reviewRef.current.value.trim());
      console.log("room", roomCode);
      const response = await fetch("http://localhost:8531/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomCode: roomCode,
          rating: rating,
          review: reviewRef.current.value.trim(),
        }),
      });
      // Handle the response accordingly
      console.log("Review submitted successfully");
      // Optionally, you can reset the rating and review state values
      setRating(0);
      setReview("");
      // Set submit success message
      setSubmitSuccess(true);
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      navigate("/inbox");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleLessonComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/complete-lesson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomCode: roomCode,
        }),
      });
      console.log("Lesson marked as complete");
      navigate("/inbox");
    } catch (error) {
      console.error("Error marking lesson as complete:", error);
    }
  };

  const myMeeting = async (element) => {
    const appID = 1760435792;
    const serverSecret = "dc34312ab6b49b5a843935e577bfbfc2";
    // Generate the kit token using the fetched userId and userName
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomCode,
      userId,
      userName
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3001/room/${roomCode}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <>
      <div ref={myMeeting}></div>
      <div className="meeting-container">
        {!isTutor && (
          <div className="rating-review-box">
            <h2>Fill this after taking the lesson</h2>
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
            <label>Review:</label>
            <textarea
              ref={reviewRef}
              value={review}
              onChange={handleReviewChange}
            ></textarea>
            <button onClick={handleReviewSubmit}>Submit</button>
            {submitSuccess && (
              <p style={{ color: "green" }}>Review submitted successfully</p>
            )}
          </div>
        )}
        {isTutor && (
          <div>
            <button onClick={handleLessonComplete}>Lesson Complete</button>
          </div>
        )}
      </div>
    </>
  );
};

export default RoomPage;
