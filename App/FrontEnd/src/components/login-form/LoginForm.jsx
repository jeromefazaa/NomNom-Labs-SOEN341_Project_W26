import "./LoginForm.css"
import { useState } from "react";

function LoginForm(){
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function handleFirstName(e){
        setFirstName(e.target.value);
    }

    function handleLastName(e){
        setLastName(e.target.value);
    }

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }

    return (
        <div>
            <h1> Login Form </h1>
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
        </div>
    )
}
export default LoginForm