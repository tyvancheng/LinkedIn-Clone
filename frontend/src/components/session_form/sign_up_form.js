import { useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { createUser } from "../../store/usersReducer";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log(email, password);
            await dispatch(createUser({ email, password }));
        } catch (err) {
            console.log("hi")
            setErrors(err.errors);
        }
    };

    useEffect(() => {
        if (errors) {
            setErrors("");
        }
    }, [errors]);
    
    return (
        <div className="sign-up-form">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                {errors && <p>{errors}</p>}
                <label htmlFor="email">Email
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </label>

                <label htmlFor="password">Password
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>

                <button type="submit">Sign Up</button>
                <p>Already on LockedIn?<Link to="/signup">Sign In</Link></p>

            </form>
        </div>
    )
}

export default SignUpForm;