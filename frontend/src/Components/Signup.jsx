import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css"; // Import SignUp.css for styling

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    fetch("http://localhost:8531/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Email already exists");
        }
        return res.json();
      })
      .then((data) => {
        // Handle success, such as showing a success message or redirecting
        console.log("User registered successfully:", data.message);
        // Redirect to the login page
        window.location.href = "/login";
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="sign-up-container">
      {" "}
      {/* Add sign-up-container class */}
      <div className="sign-up-card">
        {" "}
        {/* Add sign-up-card class */}
        <h2>REGISTER NOW</h2>
        <div>
          <label>Username:</label>
          <input
          id="a123username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Add error-message class */}
        <button onClick={handleSignUp}>Register</button>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
