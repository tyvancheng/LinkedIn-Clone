import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostIndexItem from './postIndexItem';
import { createPost, getPosts } from '../../store/posts';
import { fetchPosts } from '../../store/posts';
import linkedinicon from '../../images/linkedinicon.png'
import Modal from 'react-modal';
import PostForm from './postForm';
import './postIndex.css'

export default function PostIndex() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const [reversed, setReversed] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (!user) return null;
  // let reversedPosts = reversed ? posts : [...posts].reverse()
  return (
    <div className='post-index-and-create-post'>
      
      <PostForm />

      <ul>
        {/* {reversedPosts.map(post => { */}
        {posts.map(post => {
         return <PostIndexItem key={post.id} post={post}/>
        })}
      </ul>

    </div>
  );
}
