import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { force_modal_close } from '../../store/ui';
import closeIcon from '../../images/close-icon.png';
import icon from '../../images/icons8-male-user-50.png';
import gif from '../../images/penguinGIF.gif';

import './comingSoonModal.css'

export const ComingSoon = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const open = useSelector((state) => state.ui.modal);

    return (
        <Modal
            isOpen={open === "open_coming_soon_modal"}
            onRequestClose={() => dispatch(force_modal_close())}
            className="coming_soon-modal"
            overlayClassName="coming_soon-modal-overlay"
        >
                <div className='post-likers-modal-header'>
                    <div className='absent-div'></div>
                    <img onClick={() => dispatch(force_modal_close())} src={closeIcon}></img>
                </div>
            <div className='coming_soon-modal-content'>
                <div>Feature Coming Soon!</div>
                <img className='coming-soon-gif' src={gif}></img>
            </div>
        </Modal>        
    )
}