import React from "react";

const UserProfile = ({ user }) => {
    return (
    <div className="userProfile">
        <h1>Welcome to Habit-Chain</h1>
        <h6>An app that uses the visual of a blockchain to stack positive habits rather than an actual blockchain to rug those who don't verify a crypto project for themselves :)</h6>
        <hr />
        <p>Your Username: {user.username}</p>
        <p>Your Email: {user.email}</p>
        {user.admin ? <p>You Have Admin Privileges!</p> : null}
    </div>
    );
};

export default UserProfile