import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { deletePost } from '../../store/posts';
import './postIndexItem.css'
import profileIcon from '../../images/icons8-male-user-50.png'


export default function PostIndexItem({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
   
      
    const handleDelete = () => {
        
        dispatch(deletePost(post.id))
            // .then(() => history.push('/feed'))
    };

    if (post === []) {
        
        // Return null or display a placeholder if the post is undefined
        return null;
         
      }
  return (
    <li className="post-in-feed" key={post.id}>
    {/* <li className="post-in-feed"> */}


        {/* Maybe add profile picture image here */}
        <div className='header-in-post'>

            <img src={profileIcon} alt='profileicon'/>

            <div className='header-in-post-credentials'>
            {post.author && (
                <div>{`${post.author.firstName} ${post.author.lastName}`}</div> )}
                {/* <div>{post.author.firstName} {post.author.lastName}</div> )} */}
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