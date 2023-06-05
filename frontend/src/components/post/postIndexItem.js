import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { deletePost } from '../../store/posts';
import './postIndexItem.css'


export default function PostIndexItem({ post, postId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);


    const handleDelete = () => {
        dispatch(deletePost(post.id));
    };

  return (
    <li className="post-in-feed" key={postId}>
        <div>{post.author.firstName} {post.author.lastName}</div>
        {user.id === post.author_id && (
            <>
                <Link to={`/posts/${post.id}/edit`}> Edit</Link> 
                    {/* ^^^^^ NOT yet protected */}
                <button type="submit" onClick={handleDelete}> Delete</button>
            </>
        )}
        <div>{post.body}</div>
    </li>
  );
}