import React , { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import Modal from 'react-modal';
import PostTime from './postTime';
import PostEdit from './postEdit';
import { open_post_update_modal } from '../../store/ui';
import './postIndexItem.css'
import profileIcon from '../../images/icons8-male-user-50.png'


export default function PostIndexItem({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    const [showModal, setShowModal] = useState(false)
    // const [showEditandDelete, setShowEditandDelete] = useState(false)
    const showEditandDelete = user.id === post.author.id ? true : false;

    const handleDelete = () => {

        dispatch(deletePost(post.id))
        // .then(() => history.push('/feed'))
    };



    const handlePostOptions = () => {
        
        setShowModal(!showModal)
        
    }


    if (post.length === 0) return null;



    return (
        <li className="post-in-feed" key={post.id}>
            {/* <li className="post-in-feed"> */}


            {/* Maybe add profile picture image here */}
            <div className='header-in-post'>
                <div className='header-in-post-left'>
                    <img src={profileIcon} alt='profileicon' />

                    <div className='header-in-post-credentials'>
                        {post.author && (
                            <div>{`${post.author.firstName} ${post.author.lastName}`}</div>)}
                        {/* <div>{post.author.firstName} {post.author.lastName}</div> )} */}
                        <h6>Software Engineer @ LockedIn | App Academy</h6>
                        <h6>
                            {post.createdAt !== post.updatedAt 
                            ? `${PostTime(post.createdAt)} · Edited`
                            : PostTime(post.createdAt) 
                        }</h6>
                    </div>
                </div>

                <div className='header-in-post-right'>
                    <h5 onClick={handlePostOptions}>&hellip;</h5>
                </div>

            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                className="post-options-modal"
                overlayClassName="post-options-modal-overlay"
            >
                {showEditandDelete ? (
                    <>
                        
                        <div 
                            onClick={() => {
                    
                                dispatch(open_post_update_modal())

                }}>Edit Post <PostEdit post={post}/></div>
            
                        {/* onClick: showModal = "update...", close current modal,  */}
                        <button type="submit" onClick={handleDelete}> Delete</button>
                    </>
                ) : null}
            </Modal>
            {/* {user.id === post.author.id && (
                <>
                    <Link to={`/posts/${post.id}/edit`}> Edit</Link>
                    
                    <button type="submit" onClick={handleDelete}> Delete</button>
                </>
            )} */}
            <div className='post-body'>{post.body}</div>
        </li>
    );
}