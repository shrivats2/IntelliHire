import React from "react";
import ai from "../../../assets/ai.png";
import "./header.css";

const Header = () => (
  <div className="intelli-hire__header section__padding" id="home">
    <div className="intelli-hire__header-content">
      <h1 className="gradient__text">
        Revolutionizing the Hiring Process with AI
      </h1>
      <p>
        Say goodbye to manual resume screening and lengthy waiting periods.
        Intelli Hire leverages the power of AI to help recruiters find the
        perfect candidates efficiently and candidates receive instant feedback
        on their applications.
      </p>

      <div className="intelli-hire__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="intelli-hire__header-content__people">
        {/* <img src={people} /> */}

        <p className="gradient__text">
          Unlock the power of Intelli Hire and streamline your hiring process
          today!
        </p>
      </div>
    </div>

    <div className="intelli-hire__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
