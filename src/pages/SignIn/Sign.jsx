import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import './sign.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import { firebaseAuth } from "../../utils/firebase";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Firebase requires passwords to be at least 6 characters long
  };

  const handleSignIn = async () => {
    setError(""); // Reset error state

    const { email, password } = formValues;

    if (!validateEmail(email)) {
      setError("Invalid email format." );
      return;
    }

    if (!validatePassword(password)) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError("Email already in use. Please use a different email or log in.");
      } else if (error.code === 'auth/invalid-email') {
        setError("Invalid email address.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak.");
      } else {
        setError("Failed to sign up. Please check your details and try again.");
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
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [navigate]);

  return (
    <div className={`container ${showPassword ? 'show-password' : ''}`}>
      <img src="https://img.helpnetsecurity.com/wp-content/uploads/2020/03/23143409/netflix-collection.jpg" alt="" className="bg"/>
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            {showPassword && (
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => setShowPassword(true)}>Get Started</button>
            )}
          </div>
          {error && <div className="error">{error}</div>}
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
        </div>
      </div>
    </div>
  );
}

export default Signup;



