import LoginForm from "../login-form/LoginForm";
import SignUpForm from "../signup-form/SignUpForm";
import "./Entry.css"

function Entry(){
    function handleLoginClick(){
        //handle login click
    }

    function handleSignupClick(){
        //handle signup click
    }

    return (
    <div>
        <button type="button" onclick={handleLoginClick}>Login</button>

        <button type="button" onclick={handleSignupClick}>Sign UP</button>

    </div>)
}