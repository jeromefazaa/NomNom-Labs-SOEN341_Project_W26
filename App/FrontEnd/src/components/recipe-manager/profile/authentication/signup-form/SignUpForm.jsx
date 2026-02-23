import "./SignUpForm.css";
import { useState } from "react";
import { validatePassword } from "../../../../helper-functions/PasswordValidation";

function SignUpForm({ onSuccess }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e?.preventDefault();

    const { message, valid } = validatePassword(password);

    if (!valid) {
      document.getElementById("error-message").innerHTML = message;
      return;
    }

    const data = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      if (onSuccess) {
        onSuccess(); // switch to login
      }
      return;
    } else if (response.status === 400) {
      alert("User already exists.");
    } else {
      alert("Server error. Please try again.");
    }
  }

  return (
    <div className="auth-form">
    <h1 className="auth-title">Sign Up Form</h1>

    <div className="form-group">
      <label className="form-label">
        First Name:
        <input className="input" type="text" value={firstname} onChange={handleFirstName}/>
      </label>
    </div>

    <div className="form-group">
      <label className="form-label">
        Last Name:
        <input className="input" type="text" value={lastname} onChange={handleLastName}/>
      </label>
    </div>

    <div className="form-group">
      <label className="form-label">
        Email:
        <input className="input" type="text" value={email} onChange={handleEmail}/>
      </label>
    </div>

    <div className="form-group">
      <label className="form-label">
        Password:
        <input className="input" type="password" value={password} onChange={handlePassword}/>
      </label>
    </div>

    <p id="error-message" className="form-error"></p>

    <div className="form-actions">
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Sign Up
      </button>
    </div>
  </div>
  );
}

export default SignUpForm;