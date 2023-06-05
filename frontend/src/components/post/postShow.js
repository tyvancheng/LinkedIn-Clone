import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, fetchPost } from '../store/posts';

/*
Export as the default a `PostShow` functional component that receives no props.
The component should fetch the requested post from the database, grab it from
the store, and render its `title` as an `<h1>`, its `body` in a `<p>` tag.
Finally, include a `Link` back to the `PostIndex`.

Do NOT worry about any other styling or formatting of the component; you just
need to render the required information to the screen.
*/

export default function PostShow() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(getPost(postId));

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [postId]);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link to="/">Back to Index</Link>
    </div>
  );
}