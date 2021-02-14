import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  useDocumentTitle("URl Shortner | Login");

  const emailRef = useRef();
  const passRef = useRef();

  const [errors, setErrors] = useState([]);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;
    const errors = [];

    if (!email) errors.push("Email is Required");

    if (!password) errors.push("Password is Required");

    if (errors.length === 0) {
      login(emailRef.current.value, passRef.current.value);
    } else {
      e.target.reset();
      setErrors(errors);
    }
  };

  return (
    <div className="auth">
      <main>
        <h1>Sign in</h1>
        <p>Please Sign in to Continue</p>
        {errors.map((error) => (
          <div key={error} className="auth__error">
            {error}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="pass">PASSWORD</label>
            <input
              ref={passRef}
              placeholder="••••••••••"
              type="password"
              id="pass"
            />
          </div>
          <button>
            Sign in <i className="fas fa-arrow-right"></i>
          </button>
        </form>
        <div className="auth__switch">
          <Link to="/register"> Don't have an account? Sign Up</Link>
        </div>
      </main>
    </div>
  );
}
