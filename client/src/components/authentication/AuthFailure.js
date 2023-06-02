import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthFailure = () => {
  return (
    <>
      <h1>Something went wrong. Please try again later.</h1>
      <Link to="/">Back to Home</Link>
    </>
  );
};

export default AuthFailure;