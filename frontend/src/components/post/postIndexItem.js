import { Link, useHistory } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../store/posts';
import PostTime from './postTime';
import PostEdit from './postEdit';
import { open_post_update_modal, open_post_likers_modal } from '../../store/ui';
import { likePost, unlikePost, addComment } from '../../store/posts';
import sendIcon from '../../images/send-icon.png';
import likeIcon from '../../images/like-icon.png';
import commentIcon from '../../images/comment-icon.png';
import repostIcon from '../../images/repost-icon.png';
import { PostLikersModal } from './postLikersModal';

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
    const textareaRef = useRef(null);

    const showEditandDelete = user.id === post.author.id ? true : false;

    const handleOpenCommentLog = () => {
        setCommentLog(true)
    }
    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {


            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

            if (textareaRef.current.scrollHeight <= 43) {
                textareaRef.current.style.height = '20px';
            }
            textareaRef.current.style.overflow = 'auto'
        }
    };

    const handleComment = () => {
        // e.preventDefault();
        debugger // see commenbt value
        if (commentValue === '') return null
        dispatch(addComment(post.id, commentValue))
        setCommentValue("")
    }

    const handleDelete = () => {
        dispatch(deletePost(post.id))
        // .then(() => history.push('/feed'))
    };

    const handleClick = () => {
        debugger
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
                <img className='like-count-image' src={likeIcon} alt='likeicon' />
                <div
                    onClick={() => dispatch(open_post_likers_modal())}
                    className='like-count'>  {likeCount}
                </div>
                <PostLikersModal post={post} />
            </div>
        );
    }

    function renderComments() {
        debugger
        if (!post.comments) return null;

        const length = Object.keys(post.comments).length;
        const commentText = length === 1 ? "comment" : "comments";

        return <div id="comment-num-in-pii" onClick={handleOpenCommentLog}>{length} {commentText}</div>;
    }

    if (post.length === 0) return null;

    return (
        <li className="post-in-feed" key={post.id}>
            {/* TOP HEADER OF POST */}
            <div className='header-in-post'>
                <div className='header-in-post-left'>
                    <div className='profile-picture-container'>
                        <img src={post.author.profile_picture_url} />
                    </div>
                    <div className='header-in-post-credentials'>
                        {post.author && (
                            <div>{`${post.author.first_name} ${post.author.last_name}`}</div>)}
                        {post.author.bio && <h6>{post.author.bio}</h6>}
                        <h6>
                            {post.createdAt !== post.updatedAt
                                ? `${PostTime(post.createdAt)} · Edited`
                                : PostTime(post.createdAt)
                            }</h6>
                    </div>
                </div>

                <div className='header-in-post-right'>
                    {post.author.id === user.id && <h5 onClick={handlePostOptions}>&hellip;</h5>}
                </div>

                {showDropdown && (showEditandDelete ? (
                    <div className='post-options-dropdown'>
                        <div onClick={handleClick}> &#x270F; Edit Post
                            <PostEdit post={post} />
                        </div>
                        <button type="submit" onClick={handleDelete}>&#x1F5D1; Delete</button>
                    </div>
                ) : null)}


            </div>

            {/* BODY OF POST */}
            <div className='post-body'>{post.body}</div>

            <div className='post-likes-and-comments-container'>
                {post.likes ? renderLikes(post.likes) : <div></div>}
                {post.comments ? renderComments() : <div></div>}
            </div>

            <hr />
            <div className='post-button-container'>
                {(post.likes && post.likes[user.id])
                    ? <button onClick={handleUnlikeButton} className='active-unlike-button'>{<img src={likeIcon} alt='likeicon' />}Unlike</button>
                    : <button onClick={handleLikeButton}>{<img src={likeIcon} alt='likeicon' />}Like</button>}
                <button onClick={handleOpenCommentLog}>{<img src={commentIcon} alt='commenticon' />}Comment</button>
                <button>{<img src={repostIcon} alt='reposticon' />}Repost</button>
                <button>{<img src={sendIcon} alt='sendicon' />}Share</button>
            </div>

            {/* Comment Section in post*/}
            {(commentLog === true) && (
                <>
                    <div className='add-comment-area-container'>
                        {/* <img src={profileIcon} className='comment-profile-image'></img> */}
                        <img src={user.profilePictureUrl} className='comment-profile-image'></img>
                        <div className='add-comment-container'>
                            <textarea
                                ref={textareaRef}
                                contentEditable="true"
                                value={commentValue}
                                onChange={handleCommentChange}
                                placeholder='Add a comment...'
                            ></textarea>
                        </div>
                    </div>
                    {commentValue && <button className='add-comment-button' onClick={handleComment}>Post</button>}

                    <div className='comments-container'>
                        {post.comments &&
                            Object.values(post.comments).map(comment => {
                                return <CommentInPost comment={comment} key={comment.id} post={post} />
                            })
                        }
                    </div>
                </>
            )}

        </li>
    );
}