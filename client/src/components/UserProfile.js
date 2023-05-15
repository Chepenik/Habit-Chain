import React from "react";

const UserProfile = ({ user }) => {
    return (
    <div className="userProfile">
        <h1>Welcome to Habit-Chain</h1>
        <h6>This app was built to help people stack positive habits and make it easy to visualize their success!</h6>
        <hr />
        <p>Your Username: {user.username}</p>
        <p>Your Email: {user.email}</p>
        {user.admin ? <p>You Have Admin Privileges!</p> : null}
    </div>
    );
};

export default UserProfile