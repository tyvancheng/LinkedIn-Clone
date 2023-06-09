import linkedinicon from '../../images/linkedinicon.png';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { logoutUser } from '../../store/session';
import homeIcon from '../../images/homeIcon.png';
import networkIcon from '../../images/networkIcon.png';
import githubIcon from '../../images/githubNav.png';
import linkedinIcon from '../../images/linkedinNav.png';
import maleIcon from '../../images/icons8-male-user-50.png';
import './navbar.css';

// Make sure to set the app root element for the Modal
Modal.setAppElement('#root');

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!user) return null;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/");
  }

  return (
    <>
      <div className='nav-bar'>

        <div className='nav-bar-left'>
          <a href='/'>
            <img src={linkedinicon} alt="logo" />
          </a>
          <div>
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className='nav-bar-right'>

          <ul className='nav-bar-right-list'>

            <li className='nav-bar-right-list-element'>
              <a href='/feed'>
                <img src={homeIcon} alt="logo" />
              </a>
              Home
            </li>
            <li className='nav-bar-right-list-element'>
              <a href='/feed'>
                <img src={networkIcon} alt="logo" />
              </a>
              Network
            </li>


            <li className='nav-bar-right-list-element'>
              <a href="https://www.linkedin.com/in/tyvan-cheng-7431748b/">
                <img className="connect-logo" src={linkedinIcon} alt="linkedin-logo" />
              </a>
              Github

            </li>
            <li className='nav-bar-right-list-element'>
              <a href="https://github.com/tyvancheng">
                <img className="connect-logo" src={githubIcon} alt="github-logo"></img>
              </a>

              Linkedin
            </li>
            <li className='nav-bar-right-list-element' onClick={toggleModal}>
              <img className="connect-logo" src={maleIcon} alt="male-logo"></img>
              <span>Me&#x25BC;</span>
            </li>
          </ul>

          <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            className="me-dropdown-modal"
            overlayClassName="me-dropdown-modal-overlay"
          >
            <div className="dropdown-modal-content">
              
              <div className='header-in-post-left'>
                    <img src={maleIcon} alt='profileicon' />

                    <div className='header-in-modal-credentials'>
                
                            <div>{`${user.firstName} ${user.lastName}`}</div>
                        <h6>Software Engineer @ LockedIn</h6>
                        
                    </div>
              </div>
             
              <div className='bottom-dropdown-modal'>
                
                <div>
                  <h1>Manage Account</h1>
                  <button onClick={() => handleLogout()}>Sign Out</button>
                </div>
                
                <button className="modal-close" onClick={toggleModal}>
                  Close
                </button>

              </div>

            </div>
          </Modal>

        </div>

      </div>
    </>
  );
};

export default NavBar;



