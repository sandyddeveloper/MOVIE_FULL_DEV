import React from "react";
import { useNavigate } from "react-router-dom";
import './header.css';

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <header className="styled-header flex a-center j-between">
      <div className="logo">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" 
          alt="logo" 
        />
      </div>
      <button className="header__btn" onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </header>
  );
}
