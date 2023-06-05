import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostForm  from './PostForm';
import PostIndexItem from './postIndexItem';
import { getPosts } from '../../store/posts';
import { fetchPosts } from '../../store/posts';


export default function PostIndex() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
        {/* <PostForm /> */}
        {/* clicable box for a modal */}
        <h1>Posts</h1>
      <ul>
        {posts.map(post => {
          return <PostIndexItem key={post.id} post={post} postId={post.id}/>
        })}
      </ul>
    </div>
  );
}