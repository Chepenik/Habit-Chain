import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { GoogleLogin } from "react-google-login";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [credentialsErrors, setCredentialsErrors] = useState("")

  const validateInput = (payload) => {
    setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput(userPayload)) {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/user-sessions", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            if (response.status === 401) {
              const serverErrors = await response.json();
              setCredentialsErrors(serverErrors.message);
            }
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    }
  };  

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const responseGoogle = (response) => {
    if (response.accessToken) {
      // The user has successfully signed in with Google.
      // You can now use the `accessToken` to access Google APIs on behalf of the user.
    } else {
      // The user has not successfully signed in with Google.
    }
  };  
  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      {credentialsErrors ? <p className="callout alert">{credentialsErrors}</p> : null}
      <h1>Sign In</h1>
      <GoogleLogin
        clientId="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"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <br />
      <br />
      <h1>OR</h1>
      <br />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div className="glow-on-hover">
          <input type="submit" className="glow-on-hover-input" value="Sign In" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;