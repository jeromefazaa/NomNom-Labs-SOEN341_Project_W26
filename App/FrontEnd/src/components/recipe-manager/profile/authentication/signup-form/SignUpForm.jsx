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

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      setErrorMessage(passwordCheck.message);
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password
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

      } else if (response.status === 400) {
        const returnedData = await response.json();
        setErrorMessage(returnedData.message);
      } else {
        setErrorMessage("Server error. Please try again.");
      }

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
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>

    </div>
  );
}

export default SignUpForm;