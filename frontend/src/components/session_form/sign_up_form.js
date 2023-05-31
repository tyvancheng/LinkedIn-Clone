import { useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { createUser } from "../../store/session";
import { Link } from "react-router-dom";

const SignUpForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        if (password === confirmPassword) {
          return dispatch(createUser({ email, password, firstName, lastName }))
            .catch(async (res) => {
            let data;
            debugger
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
              debugger;
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
            debugger;
          });
        }
        // return setErrors(['Confirm Password field must be the same as the Password field']);
        debugger
      };

    // useEffect(() => {
    //     if (errors) {
    //         setErrors("");
    //     }
    // }, [errors]);
    
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

                <label htmlFor="confirm-password">Confirm Password
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </label>

                <label htmlFor="first-name">First name
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </label>

                <label htmlFor="last-name">Last name
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </label>

                <button type="submit">Sign Up</button>
                <p>Already on LockedIn?<Link to="/signup">Sign In</Link></p>

            </form>
        </div>
    )
}

export default SignUpForm;