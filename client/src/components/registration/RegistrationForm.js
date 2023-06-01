import React, { useState } from "react";
import ErrorList from "../layout/ErrorList";
import FormError from "../layout/FormError";
import config from "../../config";
import translateServerErrors from "../../services/translateServerErrors";
import { useHistory } from "react-router-dom";

const RegistrationForm = () => {
  const history = useHistory();

  const [userPayload, setUserPayload] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = () => {
    const { username, email, password, passwordConfirmation } = userPayload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};

    if (username.trim() === "") {
      newErrors = {
        ...newErrors,
        username: "is required",
      };
    }

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

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true;
    }
    return false;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validateInput()) {
      try {
        const response = await fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        });
        if (!response.ok) {
          if (response.status === 422) {
            const errorBody = await response.json();
            const newServerErrors = translateServerErrors(errorBody.errors);
            setServerErrors(newServerErrors);
          } else {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
        } else {
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

  const signUpWithGoogle = () => {
    console.log("I have been clicked")
    history.push("/api/v1/auth/google");
    console.log("I have been gone through")
  };

  if (shouldRedirect) {
    location.href = "/";
  }

  return (
    <div className="grid-container">
      <div className="googleSignIn" >
        <button onClick={signUpWithGoogle}>Sign up with Google</button>
      </div>
      <hr />
        <h1>Or Register With An Email</h1>
      <ErrorList errors={serverErrors} />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={userPayload.username}
              onChange={onInputChange}
            />
            <FormError error={errors.username} />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={userPayload.email}
              onChange={onInputChange}
            />
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
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div className="glow-on-hover">
          <input type="submit" value="Register" className="glow-on-hover-input" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;