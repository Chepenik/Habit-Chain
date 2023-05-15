import React from "react";

const UserProfile = ({ user }) => {
    return (
    <div className="userProfile">
        <h1>Welcome to HearSay!</h1>
        <p>Your Username: {user.username}</p>
        <p>Your Email: {user.email}</p>
        {user.admin ? <p>You Have Admin Privileges!</p> : null}
    </div>
    );
};

export default UserProfile