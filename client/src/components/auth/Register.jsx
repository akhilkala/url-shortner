import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { useAuth } from "../../context/AuthContext";

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export default function Register() {
  useDocumentTitle("URl Shortner | Register");

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const [errors, setErrors] = useState([]);

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirmPassword = confirmPassRef.current.value;

    const errors = [];

    // if (!name) errors.push("Full Name is Required");

    if (!email) errors.push("Email is Required");
    else if (!validateEmail(email)) errors.push("Email is wrong");

    if (!password) errors.push("Password is Required");
    else if (password.length < 8)
      errors.push("Password must be atleast 8 charecters");
    else if (!(password === confirmPassword))
      errors.push("Passwords do not match");

    if (errors.length === 0) {
      register(emailRef.current.value, passRef.current.value);
    } else {
      e.target.reset();
      setErrors(errors);
    }
  };

  return (
    <div className="auth">
      <main>
        {/* <h6>Sign up</h6> */}
        <h1>
          Sign up
          {/* Hi, <span>Welcome!</span> */}
        </h1>
        <p>Please Sign Up to Continue</p>
        {errors.map((error) => (
          <div key={error} className="auth__error">
            {error}
          </div>
        ))}
        {/* <div className="auth__error">Invalid Email ID</div>
        <div className="auth__error">Passwords do not match</div>
        <div className="auth__error">Full Name is required.</div> */}
        <form onSubmit={handleSubmit}>
          {/* <div className="auth__input">
            <label htmlFor="name">FULL NAME</label>
            <input ref={nameRef} placeholder="John Doe" type="text" id="name" />
          </div> */}
          <div className="auth__input">
            <label htmlFor="email">EMAIL</label>
            <input
              ref={emailRef}
              placeholder="johndoe@gmail.com"
              type="text"
              id="email"
            />
          </div>
          <div className="auth__input">
            <label htmlFor="pass">
              PASSWORD <span data-tip="8 Charecters Minimum">i</span>{" "}
            </label>
            <ReactTooltip effect="solid" />
            <input
              ref={passRef}
              placeholder="••••••••••"
              type="password"
              id="pass"
            />
          </div>
          <div className="auth__input">
            <label htmlFor="confirmPass">CONFIRM PASSWORD</label>
            <input
              ref={confirmPassRef}
              placeholder="••••••••••"
              type="password"
              id="confirmPass"
            />
          </div>
          <button>
            Sign Up <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        <div className="auth__switch">
          <Link to="/login"> Already have an account? Login</Link>
        </div>
      </main>
    </div>
  );
}
