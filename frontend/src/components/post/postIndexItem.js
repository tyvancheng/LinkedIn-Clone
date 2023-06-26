import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import { useEffect } from 'react';
import PostTime from './postTime';
import PostEdit from './postEdit';
import { open_post_update_modal } from '../../store/ui';
import { likePost, unlikePost, addComment } from '../../store/posts';
import sendIcon from '../../images/send-icon.png';
import likeIcon from '../../images/like-icon.png';
import commentIcon from '../../images/comment-icon.png';


import './postIndexItem.css'
import profileIcon from '../../images/icons8-male-user-50.png'
import CommentInPost from './commentInPost';


export default function PostIndexItem({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const modalOpen = useSelector((state) => state.ui.modal);
    const [showDropdown, setShowDropdown] = useState(false)
    const [commentValue, setCommentValue] = useState("")
    const [commentLog, setCommentLog] = useState(false)

    const showEditandDelete = user.id === post.author.id ? true : false;

    const handleOpenCommentLog = () => {
        setCommentLog(true)
    }
    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    };

    const handleComment = () => {
        // e.preventDefault();
        debugger // see commenbt value
        if (commentValue === '') return null
        dispatch(addComment(post.id, commentValue))
    }

    const handleDelete = () => {
        dispatch(deletePost(post.id))
        // .then(() => history.push('/feed'))
    };

    const handleClick = () => {

        dispatch(open_post_update_modal())
        // handlePostOptions()
    }
    const handlePostOptions = () => {
        setShowDropdown(!showDropdown)
        // dropdownOpen === true ? dispatch(close_dropdown()) : dispatch(show_dropdown())
    }

    const handleLikeButton = () => {
        dispatch(likePost(post.id))
    }

    const handleUnlikeButton = () => {
        if (post.likes && post.likes[user.id]) dispatch(unlikePost(post.id, post.likes[user.id].id))
    }

    function renderLikes(likes) {
        const likeCount = Object.keys(likes).length;
        if (likeCount === 0) { return null }
        return (
            <div className='like-count-container'>
                {<img className='like-count-image' src={likeIcon} alt='likeicon' />} {<div className='like-count'>{likeCount}</div>}
            </div>
        );
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

                {showDropdown && (showEditandDelete ? (
                    <div className='post-options-dropdown'>
                        <div onClick={handleClick}> &#x270F; Edit Post
                            <PostEdit post={post} />
                        </div>
                        <button type="submit" onClick={handleDelete}>&#x1F5D1; Delete</button>
                    </div>
                ) : null)}

                {/* null for now until alternate modal option */}

            </div>


            <div className='post-body'>{post.body}</div>
            {post.likes && renderLikes(post.likes)}

            <hr />
            <div className='post-button-container'>
                {(post.likes && post.likes[user.id])
                    ? <button onClick={handleUnlikeButton}>{<img src={likeIcon} alt='likeicon' />}Unlike</button>
                    : <button onClick={handleLikeButton}>{<img src={likeIcon} alt='likeicon' />}Like</button>}
                <button onClick={handleOpenCommentLog}>{<img src={commentIcon} alt='commenticon' />}Comment</button>
                <button>Repost</button>
                <button>{<img src={sendIcon} alt='sendicon' />}Share</button>
            </div>

            {/* Comment Section */}
            {(commentLog === true) && (
                <>
                    <input value={commentValue} onChange={handleCommentChange} placeholder='Add a comment...'></input>
                    {commentValue && <button onClick={handleComment}></button>}

                    {post.comments &&
                        Object.values(post.comments).map(comment => {
                            return <CommentInPost comment={comment} key={comment.id}/>
                        })
                    }
                </>
            )}

        </li>
    );
}