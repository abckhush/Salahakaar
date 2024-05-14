import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Testimonials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import profile from "./profile.jpg";

function Testimonials({ id }) {
  return (
    <>
      <div id={id} className="whole">
        <h1 id="abc">-TESTIMONIALS-</h1>
      </div>
      <section>
        <div className="user">
          <div className="avatar">
            <img src={profile} />
          </div>
          <div className="text">
            Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
            dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
            ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet
          </div>
          <div className="name">-John</div>
          <div className="icon">
            <a href="github.com/abckhush">
              <FaGithub />
            </a>
            <a href="github.com/abckhush">
              <FaInstagram />
            </a>
            <a href="github.com/abckhush">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="user">
          <div className="avatar">
            <img src={profile} />
          </div>
          <div className="text">
            Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
            dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
            ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet
          </div>
          <div className="name">-John</div>
          <div className="icon">
            <a href="github.com/abckhush">
              <FaGithub />
            </a>
            <a href="github.com/abckhush">
              <FaInstagram />
            </a>
            <a href="github.com/abckhush">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="user">
          <div className="avatar">
            <img src={profile} />
          </div>
          <div className="text">
            Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum
            dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit
            ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet
          </div>
          <div className="name">-John</div>
          <div className="icon">
            <a href="github.com/abckhush">
              <FaGithub />
            </a>
            <a href="github.com/abckhush">
              <FaInstagram />
            </a>
            <a href="github.com/abckhush">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </section>
      {/* <div className="cardsContainer">
      <div className="card">
        <img
          className="cardImage"
          src={logo}
          alt="Student"
        />
        <hr />
        <div className="cardContent">
          <h3>Student Name</h3>
          <p>Placement Details</p>
          <p>How Salahkar Helped</p>
        </div>
      </div>
      <div className="card">
        <img
          className="cardImage"
          src={logo}
          alt="Student"
        />
        <hr />
        <div className="cardContent">
          <h3>Student Name</h3>
          <p>Placement Details</p>
          <p>How Salahkar Helped</p>
        </div>
      </div>
      <div className="card">
        <img
          className="cardImage"
          src={logo}
          alt="Student"
        />
        <hr />
        <div className="cardContent">
          <h3>Student Name</h3>
          <p>Placement Details</p>
          <p>How Salahkar Helped</p>
        </div>
      </div>
    </div>
      <div className="button">
        <div className="item">
          <Link className="findbutton" to="/new">
            Find Your Tutor
          </Link>
        </div> */}
      {/* </div> */}
    </>
  );
}

export default Testimonials;
