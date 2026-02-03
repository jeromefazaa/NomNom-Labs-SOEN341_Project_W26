import { useNavigate } from "react-router-dom";
import "./Entry.css";

function Entry() {
  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }

  function handleSignupClick() {
    navigate("/signup");
  }

  return (
    <div>
      <button type="button" onClick={handleLoginClick}>
        Login
      </button>

      <button type="button" onClick={handleSignupClick}>
        Sign Up
      </button>
    </div>
  );
}

export default Entry;
