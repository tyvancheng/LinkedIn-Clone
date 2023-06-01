import { useState} from "react";
import {useDispatch} from "react-redux";
import { loginUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./sign_in_form.css"

const SignInForm = (page = null) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log(email, password);
            dispatch( await loginUser({ email, password }));
        } catch (err) {
            setErrors(err.errors);
        }
    };
    
    const signingInForm = (
        <form className="sign-in-form" onSubmit={handleSubmit}>
                <p>{errors ? errors : null}</p>
                
                <div className="auth-input-container">
                
                    <label htmlFor="email">Email</label>
                    <div className="auth-input-box">
                        <input type="text" value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder={page === 'welcome' ? null : 'Email'}
                         />
                    </div>

                    <label htmlFor="password">Password</label>
                    <div className="auth-input-box">
                        <input type="password" value={password} 
                        onChange={e => setPassword(e.target.value)}
                        placeholder={page === 'welcome' ? null : 'Password'}
                        />
                    </div>

                </div>
                
                <button className="main-auth-button" type="submit">Sign In</button>
                
                <div className="or_line_break">
                    {/* <hr/> */}
                    <h6>or</h6>
                </div>

                {/* <div className="change-link">
                    <p>New to LockedIn?<Link to="/signup">Join now</Link></p>
                </div> */}

                {/* <div className="lower-auth-buttons"> */}
                    <button className="change-link" onClick={() => { window.location.href = "/login" }}>
                        Sign in as Demo User
                    </button>

                    <button className="change-link" onClick={() => { window.location.href = "/signup" }}>
                        New to LockedIn? Join now
                    </button>
                {/* </div> */}

            </form>
    )

    return (
        <div>
            { page === 'welcome' ? signingInForm 
            : 
            <div>
                <div className="auth-form-page-header">
                <a href="/" className="welcome-logo">LockedIn</a>
                </div>
                <div className="auth-form-page-form-holder">
                    <div className="auth-form-page-form">
                        <h1>Sign In</h1>
                        <h5>Stay updated on your professional world</h5>
                        <p>{signingInForm}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default SignInForm;