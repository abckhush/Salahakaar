import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Inbox.css";

const Inbox = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isTutor, setIsTutor] = useState(false);
  const [showCreateOfferPopup, setShowCreateOfferPopup] = useState(false);
  const [showCreateMeetingPopup, setShowCreateMeetingPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("single");
  const [uniqueCode, setUniqueCode] = useState("");
  const [price, setPrice] = useState("");
  const [numberOfSessions, setNumberOfSessions] = useState("");
  const [description, setDescription] = useState("");
  const [offers, setOffers] = useState([]);
  const [offerId, setOfferId] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [personalBalance, setPersonalBalance] = useState();

  const navigate = useNavigate();

  const handleEnterRoom = useCallback(() => {
    navigate(`/room/${roomCode}`);
  }, [navigate, roomCode]);

  useEffect(() => {
    fetchUsernames();
    checkIfTutor();
    fetchPersonalBalance();
  }, []);

  useEffect(() => {
    if (selectedUser !== null) {
      fetchConversation(usernames[selectedUser].id);
      fetchOffers(usernames[selectedUser].id);
    }
  }, [selectedUser]);

  const fetchUsernames = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/inbox/usernames", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsernames(data.users);
    } catch (error) {
      console.error("Error fetching usernames:", error);
    }
  };

  const fetchConversation = async (selectedUserId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8531/inbox/conversation/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setConversation(data.messages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const fetchOffers = async (selectedUserId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8531/offers/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setOffers(data.offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const checkIfTutor = async () => {
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

  const handleUsernameClick = async (userId, index) => {
    setSelectedUser(index);
  };

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sender: localStorage.getItem("userId"),
          receiver: usernames[selectedUser].id,
          content: messageContent,
        }),
      });
      const data = await response.json();
      setMessageContent("");
      const queryParams = new URLSearchParams({
        userId: usernames[selectedUser].id,
      });
      window.history.replaceState(
        null,
        null,
        `${window.location.pathname}?${queryParams}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateOffer = () => {
    setShowCreateOfferPopup(true);
    setUniqueCode(generateUniqueCode());
    setSelectedOption("single");
  };

  const handleCreateMeeting = () => {
    setShowCreateMeetingPopup(true);
    setUniqueCode(generateUniqueCode());
  };

  const handleClosePopup = () => {
    setShowCreateOfferPopup(false);
    setShowCreateMeetingPopup(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleOffer = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/create-offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uniqueCode: uniqueCode,
          student: usernames[selectedUser].id,
          description: description,
          type: selectedOption,
          numberOfSessions:
            selectedOption === "multiple" ? numberOfSessions : null,
          price: price,
          date: date,
          time: time,
          duration: duration,
        }),
      });
      const data = await response.json();
      setShowCreateOfferPopup(false);
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleAcceptOffer = async (offerId, amount) => {
    setPaymentAmount(amount);
    setShowPaymentPopup(true);
    setOfferId(offerId);
  };

  const handleCancelPayment = () => {
    setShowPaymentPopup(false);
  };

  // Function to fetch personal balance
  const fetchPersonalBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8531/payments/balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPersonalBalance(data.balance); // Set personal balance in state
    } catch (error) {
      console.error("Error fetching personal balance:", error);
    }
  };

  const handleConfirmPayment = async () => {
    // 1. Determine the user's personal balance (You need to implement this logic)
    // Example function, replace it with your implementation
    console.log("offerId", offerId); // Retrieve offerId from state

    // 2. Compare the personal balance with the payment amount
    if (personalBalance < paymentAmount) {
      // 3. If the personal balance is insufficient, show an error message
      alert(
        `You need to add ₹${paymentAmount - personalBalance} to your account.`
      );
      return;
    }

    try {
      // 4. If the personal balance is sufficient, deduct the payment amount and send an update request
      const token = localStorage.getItem("token");
      console.log("ampunt", paymentAmount);
      const response = await fetch(
        "http://localhost:8531/update-personal-balance",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            offerId: offerId, // Use the offerId from state
            amount: paymentAmount,
          }),
        }
      );

      // Handle the response accordingly
      // For example, show a success message or update the UI
      console.log("Payment successful");

      // Close the payment popup
      setShowPaymentPopup(false);
    } catch (error) {
      console.error("Error confirming payment:", error);
      // Handle the error, show an error message, or retry the operation
    }
  };

  const generateUniqueCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleJoinMeeting = () => {};

  return (
    <div className="inbox-container">
      <div className="user-list">
        <h2>Users</h2>
        {usernames.map((user, index) => (
          <div
            key={index}
            className={`user ${selectedUser === index ? "active" : ""}`}
            onClick={() => handleUsernameClick(user.id, index)}
          >
            <Link to={`/inbox/${user.id}`}>{user.username}</Link>
          </div>
        ))}
      </div>
      <div className="conversation">
        <h2>Conversation</h2>
        {conversation.map((message, index) => (
          <div key={index} className="message">
            <div className="sender">{message.sender}</div>
            <div className="content">{message.content}</div>
            <div className="timestamp">{message.timestamp}</div>
          </div>
        ))}
        <input
          type="text"
          placeholder="Type your message here"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        {isTutor && (
          <>
            
            <button onClick={handleCreateOffer}>Create Offer</button>
          </>
        )}
      </div>

      {showCreateMeetingPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="popup-content">
              <h2>Create Meeting</h2>
              {/* Content of the popup */}
              {/* Add your content for creating a meeting here */}
            </div>
          </div>
        </div>
      )}

      {showCreateOfferPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="popup-content">
              <h2>#{uniqueCode}</h2>
              <div>
                <button
                  className={selectedOption === "single" ? "selected" : ""}
                  onClick={() => handleOptionSelect("single")}
                >
                  Single Lesson
                </button>
                <button
                  className={selectedOption === "multiple" ? "selected" : ""}
                  onClick={() => handleOptionSelect("multiple")}
                >
                  Multiple Lessons
                </button>
              </div>
              <textarea
                placeholder="Description about the service"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {selectedOption === "single" && (
                <>
                  <div>
                    <label>Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Time:</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Price:</label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Duration (in minutes):</label>
                    <input
                      type="number"
                      placeholder="Enter duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              {selectedOption === "multiple" && (
                <>
                  <div>
                    <label>Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Time:</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Number of Sessions:</label>
                    <input
                      type="number"
                      placeholder="Enter number of sessions"
                      value={numberOfSessions}
                      onChange={(e) => setNumberOfSessions(e.target.value)}
                      required
                    />
                    <label>Price:</label>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <div>
                      <label>Duration (in hours):</label>
                      <input
                        type="number"
                        placeholder="Enter duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
              <button onClick={handleOffer}>Offer</button>
            </div>
          </div>
        </div>
      )}
      <div className="offers">
        <h2>Offers</h2>
        {offers.map((offer, index) => (
          <div key={index} className="offer">
            <div className="offer-details">
              {offer.status === "confirmed" && (
                <div className="confirmation-tag">Confirmed</div>
              )}
              {offer.status === "completed" && (
                <div className="confirmation-tag">Completed</div>
              )}
              <div>Description: {offer.description}</div>
              <div>Type: {offer.type}</div>
              <div>Price: {offer.price}</div>
              {offer.numberOfSessions && (
                <div>Number of Sessions: {offer.numberOfSessions}</div>
              )}
              <div>Date: {new Date(offer.date).toLocaleDateString()}</div>
              <div>Time: {offer.time}</div>
              <div>Duration: {offer.duration} hours</div>
            </div>
            {offer.status === "pending" && isTutor && (
              <div className="offer-status">
                Pending <span className="icon">⏰</span>
              </div>
            )}
            {offer.status === "confirmed" && (
              <div className="offer-actions">
                {/* Render the "Join" button here */}
                <button onClick={() => navigate(`/room/${offer.uniqueCode}`)}>
                  Join at {offer.time}
                </button>
              </div>
            )}
            {!isTutor && (
              <div className="offer-actions">
                {offer.status === "pending" && (
                  <button
                    onClick={() => handleAcceptOffer(offer._id, offer.price)}
                  >
                    Accept
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className="popup-overlay" onClick={handleCancelPayment}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCancelPayment}>
              &times;
            </span>
            <div className="popup-content">
              <h2>Payment</h2>
              <p>Do you want to pay ₹{paymentAmount} from your account?</p>
              <button onClick={handleConfirmPayment}>Pay</button>
              <button onClick={handleCancelPayment}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;
