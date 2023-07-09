import React from "react";
import { Link } from "react-router-dom";

const styles = {
  unknownTerritory: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "20px",
    color: "white",
    wordSpacing: "15px",
  },
  message: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  errorButton: {
    border: "0",
    borderRadius: "15px",
    backgroundColor: "pink",
  },
};

const UnknownTerritory = () => {
  return (
    <div style={styles.unknownTerritory}>
      <div>
        <h1 className="err-heading"> 𝟜 𝟘 𝟜 </h1>
        <br />
        <Link to="/">
          <button className="err-btn">Go to home </button>
        </Link>
      </div>
      <h1 style={styles.heading}>
        🅾🅾🅿🆂! 🆈🅾🆄'🆅🅴 🆆🅰🅽🅳🅴🆁🅴🅳 🅸🅽🆃🅾 🆄🅽🅺🅽🅾🆆🅽 🆃🅴🆁🆁🅸🆃🅾🆁🆈.
      </h1>
      <p style={styles.message}>Are you lost or just feeling adventurous?</p>
      <p style={styles.message}>
        Either way, turn back or embrace the unknown!
      </p>
    </div>
  );
};

export default UnknownTerritory;
