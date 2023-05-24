import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="glow-on-hover signup-link">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="profile">
      <Link to="/profile">Your Profile</Link>
    </li>,
    <li key="add-habit">
      <Link to="/add-habit">Add A Habit</Link>
    </li>,
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const homeLink = user ? <Link to="/habits">Home</Link> : <Link to="/">Home</Link>;

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <img src="https://nostr.build/p/nb8895.jpeg" alt="Logo" />
          {homeLink}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;