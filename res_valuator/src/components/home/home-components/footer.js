import React from 'react';
import './footer.css';

const Footer = () => (
  <div className="intelli-hire__footer section__padding">
    <div className="intelli-hire__footer-heading">
      <h1 className="gradient__text">Be Ahead of the Curve. Step into the Future Today.</h1>
    </div>

    <div className="intelli-hire__footer-btn">
      <p>Request Early Access</p>
    </div>

    <div className="intelli-hire__footer-links">
      <div className="intelli-hire__footer-links_logo">
        <h3 style={{ color: "white" }}>Intelli Hire</h3>
        <p>Intelli Hire Pvt Ltd, <br /> &copy; All Rights Reserved</p>
      </div>
      <div className="intelli-hire__footer-links_div">
        <h4>Links</h4>
        <p>About Us</p>
        <p>Social Media</p>
        <p>Stats</p>
        <p>Contact</p>
      </div>
      <div className="intelli-hire__footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="intelli-hire__footer-links_div">
        <h4>Get in Touch</h4>
        <p>Intelli Hire Pvt Ltd</p>
        <p>+91-8989898989</p>
        <p>info@intellihire.com</p>
      </div>
    </div>

    <div className="intelli-hire__footer-copyright">
      <p>&copy; 2023 Intelli Hire. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
