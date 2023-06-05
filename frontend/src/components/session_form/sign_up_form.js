import { useState } from "react";
import {useDispatch } from "react-redux";
import {useEffect} from "react";
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
    const [form, setForm] = useState(1)

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true
        if (!/\S+@\S+\.\S+/.test(email)) {
            valid = false;
            if (!errors.includes("Invalid email")) setErrors(["Invalid email"]);
        }

        if (password.length < 6 ) {
            valid = false;
            if (!errors.includes("Password")) setErrors([ ...errors, "Password must be at least 6 characters long" ]);
        }

        if (valid === true) setForm(2)
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    
    const capitalizedName = () => {
         setFirstName(capitalizeFirstLetter(firstName))
         setLastName(capitalizeFirstLetter(lastName))
        
    };

    const handleSubmitName = (e) => {
        e.preventDefault();
        setErrors([]);
            
        capitalizedName()

           dispatch(createUser({ email, password, first_name: firstName, last_name: lastName }))
            
            .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
              
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
            
          });
          history.push('/feed')
        }

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

                        <div className="auth-form-page-form">
                        <form className="auth-form" onSubmit={handleSubmit}>

                            <div className="auth-input-container">
                                <label htmlFor="email">Email</label>
                                    <div className="auth-input-box">
                                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    {errors && <p>{errors.filter(error => error.includes("email"))}</p>}

                                <label htmlFor="password">Password</label>
                                    <div className="auth-input-box">
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    {errors && <p>{errors.filter(error => error.includes("Password"))}</p>}
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