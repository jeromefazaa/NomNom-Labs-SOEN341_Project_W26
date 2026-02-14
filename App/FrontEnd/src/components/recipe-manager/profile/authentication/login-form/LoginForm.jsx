import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login } from '../../../../redux/slices/appStateSlice'

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e?.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        // update global app state to mark user as logged in
        try { dispatch(login()) } catch (e) {}
        if (typeof onSuccess === "function") onSuccess();
        navigate("/success");
        return;
      }

      let msg = "Request failed.";
      try {
        const body = await response.json();
        if (body && body.message) msg = body.message;
      } catch (e) {}

      navigate("/error", { state: { message: msg } });
    } catch (err) {
      navigate("/error", {
        state: { message: err?.message || "Network error" },
      });
    }
  }

  return (
    <div>
      <h1> Login Form </h1>
      <label>
        {" "}
        Email:
        <input type="email" value={email} onChange={handleEmail} />
      </label>

      <label>
        {" "}
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
