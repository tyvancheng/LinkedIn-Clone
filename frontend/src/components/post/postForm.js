import {createPost} from '../../store/posts';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import linkedinicon from '../../images/linkedinicon.png'
import Modal from 'react-modal';
import profilepic from '../../images/icons8-male-user-50.png'
import './postIndex.css'



const PostForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
  
    const handleInputChange = (event) => {
      const val = event.target.value

      if (val.length <= 3000) setInputValue(event.target.value);
      }
    

    const handleCreatePost = async () => {

        try {
          // await dispatch(createPost({ author: user, body: inputValue }));
          await dispatch(createPost({ author_id: user.id, body: inputValue }));
          setShowModal(false);
        } catch (error) {
          let errorMessages = [];
      
          if (error.response) {
            const clonedResponse = error.response.clone();
      
            try {
              const data = await clonedResponse.json();
              if (data?.errors) {
                errorMessages = data.errors;
              } else {
                errorMessages = [data?.message || error.response.statusText];
              }
            } catch {
              errorMessages = [error.response.statusText];
            }
          } else {
            errorMessages = [error.message || 'An error occurred.'];
          }
      
          setErrors(errorMessages);
        }
        setInputValue('');
        };
    
    const toggleModal = () => {
        setShowModal(!showModal);
       
    }
        
    
return (
    <>
    <div className='start-a-post'>
        <img className='start-a-post-icon' src={linkedinicon}></img>
        <div className='start-a-post-modal-opener' onClick={toggleModal}>Start a Post</div>
    </div>

      <hr/>

      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="create-post-modal"
        overlayClassName="create-post-modal-overlay"
      >
        <div className="create-post-modal-content">
          <div className='create-post-modal-header-and-close'>
            <div className="create-post-modal-header">
              <div className="create-post-modal-header-content">

                <img className="create-post-modal-header-icon" src={profilepic}></img>
                <div>{user.firstName} {user.lastName}</div>
                
              </div>
            </div>
            <div className='create-post-modal-close' onClick={toggleModal}>
              <h6>&#x2715;</h6>
            </div>
          </div>

          
          {errors ? <div>{errors}</div> : null}
          <div className='create-post-modal-input-container'>
              <textarea 
                className="modal-input" 
                type="text" 
                value={inputValue}
                autoFocus={true}
                placeholder="What's on your mind?"
                onChange={handleInputChange}
              />
          </div>
          <button 
            className={`modal-submit ${inputValue ? 'active' : 'inactive'}`}
            onClick={() => {
              if (inputValue) handleCreatePost();
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
    )
}

export default PostForm;