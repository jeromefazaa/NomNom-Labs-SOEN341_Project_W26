import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const message =
    location.state?.message ||
    "There was an error processing your request. Please try again.";

  return (
    <div>
      <h1>Error</h1>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Return Home</button>
    </div>
  );
}
