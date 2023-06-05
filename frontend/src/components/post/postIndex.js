import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostIndexItem from './postIndexItem';
import { createPost, getPosts } from '../../store/posts';
import { fetchPosts } from '../../store/posts';
import linkedinicon from '../../images/linkedinicon.png'
import Modal from 'react-modal';
import './postIndex.css'

export default function PostIndex() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const user = useSelector((state) => state.session.user);
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [reversed, setReversed] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleCreatePost = () => {
    dispatch(createPost({ author: user, body: inputValue }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });

    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (!user) return null;

  let reversedPosts = reversed ? posts : [...posts].reverse()
  debugger
  return (
    <div className='post-index-and-create-post'>
      <div className='start-a-post'>
        <img className='start-a-post-icon' src={linkedinicon}></img>
        <div className='start-a-post-modal-opener' onClick={toggleModal}>Start a Post</div>
      </div>

      <hr/>

      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="create-post-modal-content">
          <div>{user.firstName} {user.lastName}</div>
          {errors ? <div>{errors}</div> : null}
          <input 
            className="modal-input" 
            type="text" 
            value={inputValue}
            placeholder="What's on your mind?"
            onChange={handleInputChange}
          />
          <button 
            className={`modal-submit ${inputValue ? 'active' : 'inactive'}`}
            onClick={() => {
              if (inputValue) handleCreatePost();
            }}
          >
            Submit
          </button>
          <button className="modal-close" onClick={toggleModal}>Close</button>
        </div>
      </Modal>

      <ul>
        {reversedPosts.map(post => {
         return <PostIndexItem key={post.id} post={post} postId={post.id}/>
        })}
      </ul>
    </div>
  );
}
