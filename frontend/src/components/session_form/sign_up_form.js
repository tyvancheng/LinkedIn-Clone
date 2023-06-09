import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
    // const [errors, setErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState(1)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true
        if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            // if (!errors.includes("Invalid email")) setErrors([...errors, "Invalid email"]);
            if (errors?.invalidEmail === undefined) setErrors((prevErrors) => ({...prevErrors, invalidEmail: "Invalid email"}));
        }

        if (password.length < 6) {
            valid = false;
            if (errors?.password === undefined) setErrors((prevErrors) => ({...prevErrors, password: "Password must be at least 6 characters long"}));
        } 

        if (valid === true) setForm(2)
    }

    useEffect(() => {
        capitalizedName();
    }, [firstName, lastName]);

    useEffect(() => {
        setErrors({})
    }, [email, password]);

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function capitalizedName() {
        setFirstName(capitalizeFirstLetter(firstName))
        setLastName(capitalizeFirstLetter(lastName))
    };

    const handleSubmitName = async (e) => {
        e.preventDefault();

        setErrors([]);

        try {
            await dispatch(createUser({ email, password, first_name: firstName, last_name: lastName }))

            // If dispatch is successful, proceed to the next step
            .then(() => history.push('/feed'));
        } catch (error) {
            let data;
            try {
                // .clone() essentially allows you to read the response body twice
                data = await error.clone().json();
            } catch {
                data = await error.text(); // Will hit this case if, e.g., server is down
            }
            
            if (data?.errors) {
                setErrors((prevErrors) => ({...prevErrors, takenEmail: data.errors}));
            } else if (data) {
                setErrors((prevErrors) => ({...prevErrors, takenEmail: data}));
            } else {
                setErrors((prevErrors) => ({...prevErrors, takenEmail: error.statusText}));

            }
            setForm(1)
            

        }
    };


    useEffect(() => {
        formSwitch(form)
    }, [form])


    const formSwitch = (form) => {
        switch (form) {
            case 1:
                return (
                    <div className="sign-up-page">

                        <div className="auth-form-page-header">
                            <a href="/" className="welcome-logo">LockedIn</a>
                        </div>

                        <h2>Make the most of your professional life</h2>

                        <div className="sign-up-form-centering">
                            <div className="auth-form-page-form">
                                <form className="auth-form" onSubmit={handleSubmit}>

                                    <div className="auth-input-container">
                                        <label htmlFor="email">Email</label>
                                        <div className={`auth-input-box ${errors && (errors.invalidEmail || errors.takenEmail) ? 'error' : ''}`}>
                                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        {/* {errors && <p>{errors.filter(error => error.includes("mail"))}</p>} */}
                                        {errors && <p className="error-message">{errors.invalidEmail}</p>}
                                        {errors && <p className="error-message">{errors.takenEmail}</p>}

                                        <label htmlFor="password">Password (6+ charactars)</label>
                                        <div className={`auth-input-box ${errors && errors.password ? 'error' : ''}`}>
                                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        {/* {errors && <p>{errors.filter(error => error.includes("Password"))}</p>} */}
                                        {errors && <p className="error-message">{errors.password}</p>}
                                    </div>

                                    <button type="submit">Agree & join</button>
                                    <div className="or_line_break">
                                        {/* <hr/> */}
                                        <h6>or</h6>
                                    </div>

                                    <button className="change-link" onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(loginUser({ email: "lockedindemo@gmail.com", password: "demouser" }))
                                            .then(() => history.push('/feed'));
                                    }}>
                                        Sign in as Demo User
                                    </button>

                                    <button className="change-link" onClick={() => history.push('/login')}>
                                        Already on LockedIn? Sign in
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="sign-up-page">
                        <div className="auth-form-page-header">
                            <a href="/" className="welcome-logo">LockedIn</a>
                        </div>

                        <div className="sign-up-name-body">
                            <h2>Make the most of your professional life</h2>

                            
                            
                            <form className="sign-up-name-box" onSubmit={handleSubmitName}>
                                <div>
                                    <label>First name</label>

                                    <div className="sign-up-input-box">
                                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label>Last name</label>

                                    <div className="sign-up-input-box">
                                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>

                                <button type="submit">Continue</button>

                            </form>


                        </div>
                    </div>
                )
            default:
                return <div>loading</div>
        }
    }
    return formSwitch(form)
}

export default SignUpForm;