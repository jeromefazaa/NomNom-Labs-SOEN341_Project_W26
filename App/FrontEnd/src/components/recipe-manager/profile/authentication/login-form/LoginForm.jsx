import "./LoginForm.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../../redux/slices/appStateSlice";

function LoginForm({ onSuccess }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appState.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (hasSubmitted && !isLoading) {
      if (onSuccess) {
        onSuccess(); // closes popup
      }
      setHasSubmitted(false);
    }
  }, [isLoading, hasSubmitted, onSuccess]);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e?.preventDefault();
    setHasSubmitted(true);

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
    console.log(`response.status ${response.status}`)
    const returnedData = await response.json();
    const userId = returnedData.email;

    if (response.status === 200) {
      dispatch(loginUser(userId));

      return;
    } else if (response.status === 400) {
      console.alert("Invalid email or password.");
      console.log("Invalid email or password.");
      setHasSubmitted(false);
    } else {
      console.alert("Server error. Please try again.");
      console.log("Server error. Please try again.");
      setHasSubmitted(false);
    }
  }

  return (
    <div className="auth-form">
      <h1 className="auth-title">Login Form</h1>

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

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}
export default LoginForm;
