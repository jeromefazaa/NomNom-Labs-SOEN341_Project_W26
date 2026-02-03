import { createBrowserRouter } from "react-router-dom";
import Entry from "./components/entry/Entry.jsx";
import LoginForm from "./components/login-form/LoginForm.jsx";
import SignUpForm from "./components/signup-form/SignUpForm.jsx";
import Success from "./components/Success.jsx";
import ErrorPage from "./components/Error.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Entry /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignUpForm /> },
  { path: "/success", element: <Success /> },
  { path: "/error", element: <ErrorPage /> },
]);

export default router;
