import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { deletePost } from '../../store/posts';
import './postIndexItem.css'
import profileIcon from '../../images/icons8-male-user-50.png'


export default function PostIndexItem({ post, postId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
   
      
    const handleDelete = () => {
        dispatch(deletePost(post.id));
    };

  return (
    <li className="post-in-feed" key={postId}>

        {/* Maybe add profile picture image here */}
        <div className='header-in-post'>

            <img src={profileIcon} alt='profileicon'/>

            <div className='header-in-post-credentials'>
                <div>{post.author.firstName} {post.author.lastName}</div>
                <h6>Software Engineer @ LockedIn | App Academy</h6>
                <h6>{post.createdAt}</h6>
            </div>

        </div>

        {user.id === post.author.id && (
            <>
                <Link to={`/posts/${post.id}/edit`}> Edit</Link> 
                    {/* ^^^^^ NOT yet protected */}
                <button type="submit" onClick={handleDelete}> Delete</button>
            </>
        )}
        <div className='post-body'>{post.body}</div>
    </li>
  );
}