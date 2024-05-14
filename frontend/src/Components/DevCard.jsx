import React from "react";
import "./AboutUs.css";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import SocialLink from "../GlobalComponents/LinkComponent/Linkcomponent";

// Display info of developers
const DevCard = (props) => {
  return (
    <div className="profileCards">
      <div>
        <img className="profileImage" src={props.varr.image} alt="" />
      </div>

      <div>
        <div className='profileName'>{props.varr.name}</div>

        {/* Display social accounts of developers */}
        <div className='link'>
          <li className='iconStyle'>
            <SocialLink link={props.varr.social[0]}>
              <FaTwitter size={20} />
            </SocialLink>
          </li>

          <li className='iconStyle'>
            <SocialLink link={props.varr.social[1]}>
              <FaLinkedin size={20} />
            </SocialLink>
          </li>

          <li className='iconStyle'>
            <SocialLink link={props.varr.social[2]}>
              <FaGithub size={20} />
            </SocialLink>
          </li>
        </div>
      </div>
    </div>
  );
};

export default DevCard;