import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    employer: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://127.0.0.1:5001/signup";
      const { data: res } = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.message);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 style={{color:"white"}}>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
              value={data.fullname}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Organisation"
              name="employer"
              onChange={handleChange}
              value={data.employer}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password1"
              onChange={handleChange}
              value={data.password1}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Re-enter Password"
              name="password2"
              onChange={handleChange}
              value={data.password2}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
