import { updatePost } from "../../store/posts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { open_post_update_modal, force_modal_close } from "../../store/ui";
import closeIcon from '../../images/close-icon.png';
import Modal from 'react-modal';
import profilepic from '../../images/icons8-male-user-50.png'

export const PostEdit = ({ post }) => {
    // update UI state 
    // dispatch updatePost
    // grab data from fetch and feed to Form

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(post.body);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const showModal = useSelector((state) => state.ui.modal);
    debugger
    const handleCloseModal = () => {
        
        if (inputValue !== post.body) {
            return (
            <>
                <h1>Discard changes?</h1>
                <button>Discard</button>
                <button>Go back</button>
            </>
            )
        } else {
            debugger
            dispatch(force_modal_close());
            
        }
    }


    const handleInputChange = (event) => {
        const val = event.target.value
    
        if (val.length <= 3000) setInputValue(event.target.value);
      }
    

    const handleUpdatePost = async () => {
        try {
            await dispatch(updatePost({ author_id: user.id, body: inputValue, id: post.id }));
            // await dispatch(updatePost(post));
            // setShowModal(false);
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
    }

    return (
        <Modal
            isOpen={showModal === "open_post_update_modal"}
            onRequestClose={handleCloseModal}
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
                    <div className='create-post-modal-close'
                        onClick={handleCloseModal}>
                        <img src={closeIcon}></img>
                    </div>
                </div>


                {/* {errors ? <div>{errors}</div> : null} */}
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

                <hr />

                <div className='modal-submit-footer'>
                    <button
                        className={`modal-submit ${inputValue ? 'active' : 'inactive'}`}
                        onClick={() => {
                            if (inputValue) handleUpdatePost();
                        }}
                    >
                        Update
                    </button>
                </div>
            </div>

        </Modal>
    )
}

export default PostEdit;