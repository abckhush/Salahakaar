import React from "react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import "./Us.css";
import Tiwari from './Tiwari.jpeg';
import Kalra from './Kalra.jpeg';

let developerInfo = [
  {
    name: "Rishit Tiwari",
    image: Tiwari,
    social: [
      "https://twitter.com/AyushGu75343194",
      "https://www.linkedin.com/in/rishit-tiwari/",
      "https://github.com/rixitgithub",
    ],
    details: "I'm an aspiring full-stack developer with a passion for creating innovative solutions. Proficient in HTML, CSS, JavaScript, and React, I aim to leverage my skills to develop dynamic and user-friendly web applications. With a strong foundation in backend technologies like Node.js and databases such as MongoDB, I strive to create seamless experiences for users.",
  },
  {
    name: "Khushi Kalra",
    image: Kalra,
    social: [
      "https://twitter.com/AyushGu75343194",
      "https://www.linkedin.com/in/khushi-kalra-a630311bb/",
      "https://github.com/abckhush",
    ],
    details: "I'm an AI/ML enthusiast passionate about exploring the depths of Artificial Intelligence and Machine Learning. My goal is to leverage these technologies to create innovative solutions that solve real-world problems and drive meaningful change. With a strong foundation in AI/ML algorithms and frameworks, I'm eager to contribute to the advancement of these fields and make a positive impact on society.",
  }

];

function Us() {
  return (
    <>
      <div id="ContactUs" className="asdfg-us">
        <div className="h-us">
          <h1>-MEET THE DEVELOPERS-</h1>
        </div>
        <div id="kkbb" className="container-us">
          {developerInfo.map((dev, index) => (
            <div key={index} className="card-us">
              <div className="card-content-us">
                <img
                  className="profile-img-us"
                  src={dev.image}
                  alt={dev.name}
                />
                <div className="text-content-us">
                  <h3>{dev.name}</h3>
                  {dev.details && <p>{dev.details}</p>}
                  <div className="social-links-us">
                    <a href={dev.social[2]}>
                      <FaGithub />
                    </a>
                    <a href={dev.social[1]}>
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Us;