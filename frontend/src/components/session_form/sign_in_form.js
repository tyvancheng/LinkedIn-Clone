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
    
    return (
        <div>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                {page === 'welcome' ? null : <h1>Sign In</h1>}
                <p>{errors ? errors : null}</p>
                
                <div className="input-container">
                {/* <div> */}
                    <label htmlFor="email">Email</label>
                    <div className="input">
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                {/* </div> */}

                {/* <div> */}
                    <label htmlFor="password">Password</label>
                    <div className="input">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                {/* </div> */}
                </div>
                <button type="submit">Sign In</button>
                <p>New to LockedIn?<Link to="/signup">Join now</Link></p>

            </form>
        </div>
    )
}

export default SignInForm;