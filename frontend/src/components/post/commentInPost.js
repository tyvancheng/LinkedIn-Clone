import './commentInPost.css'
import { useSelector, useDispatch } from 'react-redux';
import React,{ useState, useEffect, useRef } from 'react';
import { deleteComment, editComment } from '../../store/posts';
import { useHistory } from 'react-router-dom';

export default function CommentInPost({ comment, post }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const [modalOpen, setModalOpen] = useState(false);
    // const [editComment, setEditComment] = useState(false);
    const [temp, setTemp] = useState(false);
    const [content, setContent] = useState(comment.body);

    const dropdownRef = useRef(null);

    const validUser = () => {
        return (comment.author.id === user.id) || (post.author.id === user.id)
    }

    const handleClick = () => {
        setModalOpen(!modalOpen)
    }

    const handleDelete = () => {
        setModalOpen(!modalOpen)
        dispatch(deleteComment(post.id, comment.id))
    }

    const handleEdit = () => {
        if (content === comment.body) return
        dispatch(editComment(post.id, comment.id, content))
        .then(() => {
            setTemp(false);
          });
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleTemp = () => {
        setModalOpen(false)
        setTemp(!temp)
    }

    const handleProfilePage = () => {
        history.push(`/profile/${comment.author.id}`);
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

                {/* COMMENT HEADER */}
                <img src={comment.author.profile_picture_url} className='comment-profile-image' onClick={handleProfilePage}></img>
                <div className='comment-credentials-and-body-container'>
                    <div className='comment-credentials-first-line'>
                        <div className='comment-author-name' onClick={handleProfilePage}>{`${comment.author.first_name} ${comment.author.last_name}`}</div>
                        {(validUser() && (!modalOpen && !temp)) && <h4 onClick={handleClick}>&hellip;</h4>}
                        {modalOpen &&
                            <>
                                <div ref={dropdownRef} className={`comment-options-dropdown ${comment.author.id !== user.id && 'no-edit'}`}>
                                    {comment.author.id === user.id && <div onClick={handleTemp}> &#x270F; Edit </div>}
                                    <div onClick={handleDelete}>&#x1F5D1; Delete</div>
                                </div>
                            </>
                        }
                    </div>
                    {comment.author.bio && <div className='comment-author-bio'>{comment.author.bio}</div>}

                    {/* COMMENT BODY */}
                    {temp === true
                    ? <textarea className='edit-comment-text-area' value={content} onChange={handleContentChange}>{content}</textarea>
                    : <div className='comment-body'>{comment.body}</div>
                    }
                </div>
            </div>
            {temp && 
            <>
            <button onClick={handleEdit}>Save changes</button>
            <button onClick={handleTemp}>Cancel</button>
            </>}
        </>
    )
}