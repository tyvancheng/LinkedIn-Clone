import React from 'react'
import { Link } from 'react-router-dom';
// import SignInForm from '../session_form/sign_in_form';
import githublogo from '../../images/githublogo.jpeg'
import linkedinlogo from '../../images/linkedinlogo.jpeg'
import firstbody from '../../images/firstbody.png'
import SignInForm from '../session_form/sign_in_form';
import './welcome.css'


export default function Welcome() {
    return (
        <div>
            <header>
                <nav className='logo-container'>
                    <h1 className='welcome-logo'>LockedIn</h1>

                </nav>
                
                <nav className='nav-links'>
                    <div className='connect-logos'> 
                        <a href="https://www.linkedin.com/in/tyvan-cheng-7431748b/">
                            <img className="connect-logo" src={linkedinlogo} alt="linkedin-logo" />
                        </a>
                        <a href="https://github.com/tyvancheng">
                            <img className="connect-logo" src={githublogo} alt="github-logo"></img>
                        </a>
                    </div>

                    <div className='connect-links'>
                        <Link id="join-now" className='connect-link' to="/signup">Join now</Link>
                        <Link id="sign-in" className='connect-link' to="/login">Sign in</Link>
                    </div>
                </nav>
            </header>

            <div className='body'>
                <div className='first-body'>

                    <div className='left'>
                        <h1 id="welcome-message">Welcome to your professional community</h1>
                        {SignInForm('welcome')}
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>

                    <div className='right'>
                        <img src={firstbody} alt="welcomephoto" />
                    </div>
    
                </div>
            </div>
        </div>
    )
}