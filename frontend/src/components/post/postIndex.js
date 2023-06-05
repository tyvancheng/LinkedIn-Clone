import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PostForm  from './PostForm';
import PostIndexItem from './postIndexItem';
import { getPosts } from '../../store/posts';
import { fetchPosts } from '../../store/posts';
import linkedinicon from '../../images/linkedinicon.png'
import Modal from 'react-modal';
import './postIndex.css'

export default function PostIndex() {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);



  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (!user) return null;

  return (
    <div>
        {/* <PostForm /> */}
        {/* clicable box for a modal */}
        <div className='start-a-post'>
            <img className='start-a-post-icon' src={linkedinicon}></img>
            <div className='start-a-post-modal-opener' onClick={toggleModal}>Start a Post</div>
        </div>

        <Modal
            isOpen={showModal}
            onRequestClose={toggleModal}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <ul className="dropdown-menu">
                <li>{user.firstName} {user.lastName}</li>
                <li>Sign Out</li>
              </ul>
              <button className="modal-close" onClick={toggleModal}>
                Close
              </button>
            </div>
          </Modal>

      <ul>
        {posts.map(post => {
          return <PostIndexItem key={post.id} post={post} postId={post.id}/>
        })}
      </ul>
    </div>
  );
}