import linkedinicon from '../../images/linkedinicon.png';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from 'react-modal';
import './navbar.css';

// Make sure to set the app root element for the Modal
Modal.setAppElement('#root');

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
            <li>home</li>
            <li>network</li>
            <li>github</li>
            <li>linkedin</li>
            <li>
              <span onClick={toggleModal}>Me</span>
            </li>
          </ul>
          
          <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <ul className="dropdown-menu">
                <li>{user.first_name} {user.last_name}</li>
                <li>Sign Out</li>
              </ul>
              <button className="modal-close" onClick={toggleModal}>
                Close
              </button>
            </div>
          </Modal>

        </div>

      </div>
    </>
  );
};

export default NavBar;
