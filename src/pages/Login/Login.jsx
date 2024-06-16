import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import './login.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { firebaseAuth } from "../../utils/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Require passwords to be at least 6 characters long
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/"); // Navigate to home
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError("No user found with this email.");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else {
        setError("Failed to sign in. Please check your details and try again.");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="container__login">
      <Header />
      <div className="login">
        <div className="background">
          <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <input
                type="text"
                placeholder="Email or mobile number"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button type="submit">Sign In</button>
              {error && <div className="error">{error}</div>}
              <div className="options">
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div className="help">
                  <a href="#">Need help?</a>
                </div>
              </div>
            </form>
            <div className="sign-up">
              <p>New to Netflix? <a href="#">Sign up now.</a></p>
              <p className="captcha">This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
