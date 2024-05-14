import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function SelTutor() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    subjectsTaught: "",
    qualifications: "",
    hourlyRate: "",
  });
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get("subject");

  useEffect(() => {
    fetchTutors();
  }, [subject]);

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const fetchTutors = async () => {
    try {
      const response = await fetch(
        "http://localhost:8531/seltutor?subject=${subject}"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tutors");
      }
      const data = await response.json();
      setTutors(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch("http://localhost:8531/tutors/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) {
        throw new Error("Failed to apply filters");
      }
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      subjectsTaught: subject || "",
      qualifications: "",
      hourlyRate: "",
    });
    navigate("/tutor");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCardClick = (id) => {
    navigate(`/tutor-details/${id}`);
  };

  return (
    <div className="tutor-cards-container">
      <h1>Find the tutors that fit your needs</h1>
      <p className="tagline">
        Discover experienced tutors for personalized learning and book
        one-to-one online lessons to fit your schedule.
      </p>
      {error && <p className="error-message">{error}</p>}
      <div className="filter-toggle">
        <button className="toggle-filter-button" onClick={toggleFilter}>
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
        {showFilter && (
          <div className="filter-panel">
            <h3>FILTER</h3>
            <div className="filter-input">
              <label>
                <b>SUBJECTS TAUGHT:</b>
              </label>
              <input
                type="text"
                name="subjectsTaught"
                value={filters.subjectsTaught}
                onChange={handleInputChange}
              />
            </div>
            <div className="filter-input">
              <label>
                <b> QUALIFICATIONS:</b>
              </label>
              <input
                type="text"
                name="qualifications"
                value={filters.qualifications}
                onChange={handleInputChange}
              />
            </div>
            <div className="filter-input">
              <label>
                <b>HOURLY RATE:</b>
              </label>
              <input
                type="text"
                name="hourlyRate"
                value={filters.hourlyRate}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-container-gettutor">
              <button onClick={handleFilter}>Apply Filters</button>
              <button onClick={handleResetFilters}>Reset Filters</button>
            </div>
          </div>
        )}
      </div>
      <div className="content-wrapper">
        <div className="tutor-cards">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="tutor-cards">
              {tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="tutor-card"
                  onClick={() => handleCardClick(tutor.id)}
                  onMouseEnter={() => setHoveredCard(tutor.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="tutor-card-content">
                    <div className="tutor-details">
                      <h3>{tutor.name}</h3>
                      <p>Subjects Taught: {tutor.subjectsTaught.join(", ")}</p>
                      <p>Qualifications: {tutor.qualifications}</p>
                      {hoveredCard === tutor.id && (
                        <div className="hourly-rate-box">
                          <p>₹{tutor.hourlyRate}</p>
                          <div className="additional-info">
                            <p>
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "#ffd700" }}
                              />{" "}
                              0 / 5
                            </p>
                            <p>0 reviews</p>
                            <p>0 lessons</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="filter-panel">
          <h3>FILTER</h3>
          <div className="filter-input">
            <label>
              <b>SUBJECTS TAUGHT:</b>
            </label>
            <input
              type="text"
              name="subjectsTaught"
              value={filters.subjectsTaught}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-input">
            <label>
              <b> QUALIFICATIONS:</b>
            </label>
            <input
              type="text"
              name="qualifications"
              value={filters.qualifications}
              onChange={handleInputChange}
            />
          </div>
          <div className="filter-input">
            <label>
              <b>HOURLY RATE:</b>
            </label>
            <input
              type="text"
              name="hourlyRate"
              value={filters.hourlyRate}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-container-gettutor">
            <button onClick={handleFilter}>Apply Filters</button>
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelTutor;
