import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../../redux/slices/appStateSlice";

function LoginForm({ onSuccess }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appState.isLoading);
  const isLoggedIn = useSelector((state) => state.appState.isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasSubmitted && !isLoading && isLoggedIn) {
      if (onSuccess) {
        onSuccess(); // closes popup only if login succeeded
      }
      setHasSubmitted(false);
    }
  }, [isLoading, hasSubmitted, onSuccess, isLoggedIn]);

  function handleEmail(e) {
    setEmail(e.target.value);
    setErrorMessage("");
  }

  function handlePassword(e) {
    setPassword(e.target.value);
    setErrorMessage("");
  }

  function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
  e?.preventDefault();
  setHasSubmitted(true);
  setErrorMessage("");

  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    setErrorMessage("Please fill in all fields.");
    return;
  }

  if (!isValidEmail(trimmedEmail)) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  const data = {
    email: trimmedEmail,
    password: trimmedPassword,
  };

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const returnedData = await response.json();
      const userId = returnedData.email;

      dispatch(loginUser(userId));
      if (onSuccess) { onSuccess(); }
      return;
    }

    if (response.status === 400) {
      let returnedData = null;
      try {
        returnedData = await response.json();
      } catch {}

      setErrorMessage(
        returnedData?.message || "Invalid email or password."
      );
      setHasSubmitted(false);
      return;
    }

    setErrorMessage("Server error. Please try again.");
    setHasSubmitted(false);

  } catch (error) {
    setErrorMessage("Network error. Please check your connection.");
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
            data-testid="email"
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
            data-testid="password"
            className="input"
            type="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
      </div>

      <p id="error-message" className="form-error">{errorMessage}</p>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary login-action-button"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;