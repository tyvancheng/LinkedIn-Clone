import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { loginUser } from "../../store/session";
import { useHistory } from "react-router-dom";
import "./sign_in_form.css"

const SignInForm = (page = null) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log(email, password);
            const response = await dispatch(loginUser({ email, password }));
            if (response.ok) {
                history.push(`/feed`);
            } else {
                const errorData = await response.json();
                console.log(errorData)
                console.log(response)
                if (errorData?.errors) {
                    setErrors((prevErrors) => ({ ...prevErrors, invalidCreds: errorData.errors }));
                } else if (errorData) {
                    setErrors((prevErrors) => ({ ...prevErrors, invalidCreds: errorData }));
                } else {
                    setErrors((prevErrors) => ({ ...prevErrors, invalidCreds: response.statusText }));
                }
            }
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, invalidCreds: "Invalid credentials" }));
            
        }
    };
    
    const loginDemoUser = (e) => {

        e.preventDefault();
        try {
            console.log(email, password);
            dispatch(loginUser({ email: "lockedindemo@gmail.com", password: "demouser" }))
            .then(() => history.push(`/feed`));
        } catch (err) {
            setErrors(err.errors);
        }
    };
    const handleBlur = () => {
    
        if (!/\S+@\S+\.\S+/.test(email)) {
            if (errors?.invalidEmail === undefined) setErrors((prevErrors) => ({...prevErrors, invalidEmail: "Invalid email"}));
        } else {
            setErrors({});
        }
    }
      
    const signingInForm = (
        <form className="auth-form" onSubmit={handleSubmit}>
                
                <div className="auth-input-container">
                
                    <label htmlFor="email">Email</label>
                    <div id="sign-in-email-box" className={`auth-input-box ${errors && errors.invalidCreds ? 'error' : ''}`}>
                        <input id="sign-in-email-input" type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder={page === 'welcome' ? null : 'Email'}
                        onBlur={() => handleBlur("email")}
                        />
                    </div>
                        
                        {errors && <div className="error-message">{errors.invalidCreds}</div>}

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
                    <button className="change-link" onClick={loginDemoUser}>
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
                        <div>{signingInForm}</div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
        }

export default SignInForm