import { useState } from "react";
import LoginForm from "./login-form/LoginForm";
import SignUpForm from "./signup-form/SignUpForm";

function Authentication({ onAuthSuccess }) {
  const [view, setView] = useState("menu"); // "menu" | "login" | "signup"

  function showMenu() {
    setView("menu");
  }

  return (
    <div className="auth">
      {view === "menu" && (
        <div className="auth-actions">
          <button type="button" className="btn btn-secondary" onClick={() => setView("login")}>
            Login
          </button>

      <button type="button" className="btn btn-primary" onClick={() => setView("signup")}>
        Sign Up
      </button>
    </div>
      )}

      {view !== "menu" && (
        <div className="auth-form-area">
          <button type="button" className="auth-back" onClick={showMenu}>
            ← Back
          </button>

            {view === "login" ? (
              <LoginForm
                onSuccess={() => {       // close small modal
                  if (onAuthSuccess) onAuthSuccess(); // close Profile dialog
                }}
              />
            ) : (
              <SignUpForm
                onSuccess={() => {
                  setView("login");  // show login after signup
                }}
              />
            )}
          </div>
      )}
    </div>
  );
}

export default Authentication;