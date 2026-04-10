import { useState } from "react";
import { validatePassword } from "../../../../helper-functions/PasswordValidation";

function SignUpForm({ onSuccess }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
    setErrorMessage("");
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    setErrorMessage("");
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrorMessage("");
  }

  function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setErrorMessage("");
  }

  async function handleSubmit(e) {
  e?.preventDefault();

  const trimmedFirstName = firstName.trim();
  const trimmedLastName = lastName.trim();
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPassword) {
    setErrorMessage("Please fill in all fields.");
    return;
  }

  if (!isValidEmail(trimmedEmail)) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  const passwordCheck = validatePassword(trimmedPassword);
  if (!passwordCheck.valid) {
    setErrorMessage(passwordCheck.message);
    return;
  }

  const data = {
    firstName: trimmedFirstName,
    lastName: trimmedLastName,
    email: trimmedEmail,
    password: trimmedPassword,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      if (onSuccess) {
        onSuccess();
      }
      return;
    }

    if (response.status === 400) {
      let returnedData = null;
      try {
        returnedData = await response.json();
      } catch {}

      setErrorMessage(
        returnedData?.message || "Unable to sign up. Please verify your information."
      );
      return;
    }

    setErrorMessage("Server error. Please try again.");

  } catch (error) {
    setErrorMessage("Network error. Please check your connection.");
  }
}

  return (
    <div className="auth-form">

      <h1 className="auth-title">Sign Up</h1>

      <div className="form-group">
        <label className="form-label">
          First Name:
          <input
            className="input"
            type="text"
            value={firstName}
            onChange={handleFirstName}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Last Name:
          <input
            className="input"
            type="text"
            value={lastName}
            onChange={handleLastName}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Email:
          <input
            className="input"
            type="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">
          Password:
          <input
            className="input"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
      </div>

      <p className="form-error">{errorMessage}</p>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary signup-action-button"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>

    </div>
  );
}

export default SignUpForm;