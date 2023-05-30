import React from 'react'
import { Link } from 'react-router-dom';
import SignInForm from '../session_form/sign_in_form';


export default function Welcome() {
    return (
        <div>
            <header>
                <h1>LockedIn</h1>
                <a href="https://www.linkedin.com/in/tyvan-cheng-7431748b/">LinkedIn</a>
                <a href="https://github.com/tyvancheng">GitHub</a>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </header>

            <h1>Welcome to your professional community</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}