import "./LoginForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../../../redux/slices/appStateSlice";

function LoginForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e?.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      dispatch(login());

      if (onSuccess) {
        onSuccess(); // closes popup
      }

      return;
    } else if (response.status === 400) {
      alert("Invalid email or password.");
    } else {
      alert("Server error. Please try again.");
    }
  }

  return (
    <div>
      <h1> Login Form </h1>

      <label>
        Email:
        <input type="email" value={email} onChange={handleEmail} />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={handlePassword} />
      </label>

      <button type="button" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}
export default LoginForm;
