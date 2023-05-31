import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm  from './AuthForm';
import { loginUser, createUser } from '../store/session';

/*
Export as the default a `PostIndex` component that renders a list (`ul`) of
`PostIndexItems`. This component should grab the `posts` slice of state from the
store. It should also fetch the posts from the backend after the first render.
(You should be able to handle the case where the store is empty--`{}`--on first
render.) Below the `ul`, render a new post form.
*/

export default function AuthIndex() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <ul>
        {posts.map(post => {
          return <PostIndexItem post={post} />
        })}
      </ul>
      <PostForm />
    </div>
  );
}