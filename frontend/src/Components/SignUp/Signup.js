import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import handleSingup from "../Auth/HandleSignup.js";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (email === "" || password === "" || confirmPassword === "" || email === null || password === null || confirmPassword === null) {
      alert("All details are mandatory !");
    } 

    else if(password!==confirmPassword){
        alert("Password does not match !")
    }

    else {
      const userInput = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      
      const accessFlag = await handleSingup(userInput);

      if (accessFlag === true) {
        event.target.email.value=""
        event.target.password.value=""
        event.target.confirmPassword.value=""
        alert("User Registered Succesfully");
      } else {
        alert("Failed, try again");
      }
    }
  };

  return (
    <div className="signup-root">
      <div className="formBuilder formSupport">
        <h1>Get started with your Form Generator journey!</h1>
      </div>

      <div className="signupContainer loginContainer">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="item">
            <label className="label" htmlFor="email"></label>
            <input
              className="item1 input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
            ></input>
          </div>

          <div className="item">
            <label className="label" htmlFor="password"></label>
            <input
              className="item1 input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
            ></input>
          </div>

          <div className="item">
            <label className="label" htmlFor="confirmPassword"></label>
            <input
              className="item1 input"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
            ></input>
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <div className="item">
          <span>
            Already have an account?{" "}
            <button
              className="navigation"
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Log in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
