import './commentInPost.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { deleteComment } from '../../store/posts';

export default function CommentInPost({ comment, post }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [modalOpen, setModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    const validUser = () => {
        return (comment.author.id === user.id) || (post.author.id === user.id)
    }

    const handleClick = () => {
        setModalOpen(!modalOpen)
    }

    const handleDelete = () => {
        debugger
        dispatch(deleteComment(post.id, comment.id))
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };
        if (!modalOpen) return

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [modalOpen]);

    return (
        <>
            <div className='comment-container'>
                {/* <img src={icon} className='comment-profile-image'></img> */}
                <img src={comment.author.profile_picture_url} className='comment-profile-image'></img>
                <div className='comment-credentials-and-body-container'>
                    <div className='comment-credentials-first-line'>
                        <div className='comment-author-name'>{`${comment.author.first_name} ${comment.author.last_name}`}</div>
                        {(validUser() && !modalOpen) && <h4 onClick={handleClick}>&hellip;</h4>}
                        {modalOpen &&
                            <>
                                <div ref={dropdownRef} className={`comment-options-dropdown ${comment.author.id !== user.id && 'no-edit'}`}>
                                    {comment.author.id === user.id && <div onClick={handleClick}> &#x270F; Edit </div>}
                                    <div onClick={handleDelete}>&#x1F5D1; Delete</div>
                                </div>
                            </>
                        }
                    </div>
                    {comment.author.bio && <div className='comment-author-bio'>{comment.author.bio}</div>}
                    <div className='comment-body'>{comment.body}</div>
                </div>
            </div>
        </>
    )
}