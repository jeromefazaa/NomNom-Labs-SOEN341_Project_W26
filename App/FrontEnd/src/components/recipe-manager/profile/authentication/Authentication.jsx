import { useState } from "react";
import "./Authentication.css";
import LoginForm from "./login-form/LoginForm";
import SignUpForm from "./signup-form/SignUpForm";

function Authentication() {
  const [dialog, setDialog] = useState(null); 

  function handleLoginClick() {
    setDialog("login");
  }

  function handleSignupClick() {
    setDialog("signup");
  }

  function closeDialog() {
    setDialog(null);
  }

  if(isLoggedIn == false) { // do isloggedout logic
  return (
    <div>
      <button type="button" onClick={handleLoginClick}>
        Login
      </button>

      <button type="button" onClick={handleSignupClick}>
        Sign Up
      </button>

      {dialog && (
        <div className="auth-modal-overlay" onClick={closeDialog}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-modal-close" onClick={closeDialog}>
              ×
            </button>
            {dialog === "login" ? (
              <LoginForm onSuccess={closeDialog} />
            ) : (
              <SignUpForm onSuccess={closeDialog} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
}

export default Authentication;
