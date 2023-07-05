import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { force_modal_close } from '../../store/ui';
import closeIcon from '../../images/close-icon.png';
import icon from '../../images/icons8-male-user-50.png';

import './postLikersModal.css'

export const PostLikersModal = ({ post }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const open = useSelector((state) => state.ui.modal);

    return (
        <Modal
            isOpen={open === "open_post_likers_modal"}
            onRequestClose={() => dispatch(force_modal_close())}
            className="post-likers-modal"
            overlayClassName="post-likers-modal-overlay"
        >
            <div className='post-likers-modal-content'>
                <div className='post-likers-modal-header'>
                    <div>Reactions</div>
                    <img onClick={() => dispatch(force_modal_close())} src={closeIcon}></img>
                </div>

                <hr />
                <div className='post-likers-modal-list'>
                    {Object.values(post.likes).map(like => {
                        const handleProfileRedirect = () => {
                            history.push(`/profile/${like.liker.id}`)
                        }
                        return (
                            <>
                                <div className='post-likers-modal-liker'>
                                    <div className='profile-picture-container'>
                                        <img src={like.liker.profile_picture_url} onClick={handleProfileRedirect}></img>
                                    </div>
                                    <div className='post-likers-modal-liker-info' onClick={handleProfileRedirect}>
                                        <div className='post-likers-modal-liker-name'>{`${like.liker.first_name} ${like.liker.last_name}`}</div>
                                        {like.liker.bio && <div className=''>{like.liker.bio}</div>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </Modal>
    )
}