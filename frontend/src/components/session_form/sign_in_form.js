import { useState} from "react";
import {useDispatch} from "react-redux";
import { loginUser } from "../../store/session";
import { Link } from "react-router-dom";

const SignInForm = () => {
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
        <div className="sign-in-form">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <p>{errors ? errors : null}</p>
                <label htmlFor="email">Email
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label htmlFor="password">Password
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>

                <button type="submit">Sign In</button>
                <p>New to LockedIn?<Link to="/signup">Join now</Link></p>

            </form>
        </div>
    )
}

export default SignInForm;