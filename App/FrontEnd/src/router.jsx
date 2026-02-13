import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginForm from "./components/recipe-manager/profile/authentication/login-form/LoginForm";
import SignUpForm from "./components/recipe-manager/profile/authentication/signup-form/SignUpForm";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/signup', element: <SignUpForm /> }
]);

export default router;
