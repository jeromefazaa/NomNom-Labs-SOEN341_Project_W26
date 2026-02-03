import "./SignUpForm.css"
import { useState } from "react";
import { validatePassword} from "../helper-functions/PasswordValidation";
function SignUpForm() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        const {message, valid} = validatePassword(password)

        if(!valid){
            document.getElementById("error-message").innerHTML= message
            
        }

        const data = {
            "firstname":firstname,
            "lastname":lastname,
            "email":email,
            "password":password
        }

        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const status = response.status
        if (status === 200) {
            //reroute to main page, success
        }
        else if (status === 400){
            //reroute to error page, fail
        }


        }

    return (
        <div>
            <h1> Sign Up Form </h1>
            <label> First Name:
                <input
                    type="text"
                    value={firstname}
                    onChange={handleFirstName}
                />
            </label>

            <label> Last Name:
                <input
                    type="text"
                    value={lastname}
                    onChange={handleLastName}
                />
            </label>

            <label> Email:
                <input
                    type="text"
                    value={email}
                    onChange={handleEmail}
                />
            </label>

            <label> Password:
                <input
                    type="text"
                    value={password}
                    onChange={handlePassword}
                />
            </label>

            <p id="error-message"></p>

            <button type="button" onclick={handleSubmit}>Sign Up</button>
        </div>
    )
}
export default SignUpForm