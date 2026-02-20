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
    <div>
      <h1> Sign Up Form </h1>

      <label>
        First Name:
        <input type="text" value={firstname} onChange={handleFirstName} />
      </label>

      <label>
        Last Name:
        <input type="text" value={lastname} onChange={handleLastName} />
      </label>

      <label>
        Email:
        <input type="text" value={email} onChange={handleEmail} />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={handlePassword} />
      </label>

      <p id="error-message"></p>

      <button type="button" onClick={handleSubmit}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUpForm;