import { useState } from "react";
import {useDispatch} from "react-redux";
import { createUser } from "../../store/session";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../store/session";
import { NameInput } from "./name_input";
import "./sign_up_form.css";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        let valid = true
        if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            if (!errors.includes("Invalid email")) {
                setErrors(["Invalid email"]);
          };
        }

        if (password.length < 6 ) {
            valid = false;
            setErrors([ ...errors, "Password field must be at least 6 characters long" ]);
        }

        if (valid === true) NameInput()
    }
       
    
    return (
        <div>
            
            <div className="auth-form-page-header">
                    <a href="/" className="welcome-logo">LockedIn</a>
            </div>

            <h1>Make the most of your professional life</h1>

            <div className="auth-form-page-form">
            <form className="auth-form" onSubmit={handleSubmit}>
                {errors && <p>{errors}</p>}
                <div className="auth-input-container">
                    <label htmlFor="email">Email</label>
                        <div className="auth-input-box">
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                    <label htmlFor="password">Password</label>
                        <div className="auth-input-box">
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>


                    {/* <label htmlFor="first-name">First name</label>
                        <div className="auth-input-box">
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </div>

                    <label htmlFor="last-name">Last name</label>
                        <div className="auth-input-box">
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </div> */}
                </div>
        
                <button type="submit">Agree & join</button>
                <div className="or_line_break">
                    {/* <hr/> */}
                    <h6>or</h6>
                </div>

                <button className="change-link" onClick={() => {
                        dispatch(loginUser({ email: "lockedindemo@gmail.com", password: "demouser" }))
                        }}>
                        Sign in as Demo User
                    </button>
    
                <button className="change-link" onClick={() => history.push('/login')}>
                    Already on LockedIn? Sign in
                </button>

            </form>
            </div>
        </div>
    )
}

export default SignUpForm;