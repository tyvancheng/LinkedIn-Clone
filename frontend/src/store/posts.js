import { csrfFetch } from "./csrf";

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'


//Actions
export const receivePosts = posts => { return { type: RECEIVE_POSTS, posts } }

export const receivePost = post => { return { type: RECEIVE_POST, post } }

export const removePost = postId => { return { type: REMOVE_POST, postId } }



//Selectors
export const getPost = postId => (state) => state.posts ? state.posts[postId] : null

export const getPosts = state => {
  return state.posts ? Object.values(state.posts).sort((a,b) => {
   return a.createdAt < b.createdAt ? 1 : -1
  }) : []
}



// Thunk action creators
export const fetchPosts = () => async dispatch => {
  const res = await csrfFetch(`/api/posts`)
  const posts = await res.json()
  dispatch(receivePosts(posts))
}

export const fetchPost = postId => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}`)
  const postObj = await res.json()
  dispatch(receivePost(postObj))
}


export const createPost = post => async dispatch => {

  const {body, author_id} = post 
  const res = await csrfFetch(`/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body, author_id})
  });
   
  const postObj = await res.json();

  dispatch(receivePost(postObj.post));
};

export const updatePost = post => async dispatch => {

  const {body, author_id, id} = post 
  
  const res = await csrfFetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body, author_id})
  })
  const postObj = await res.json()
  dispatch(receivePosts(postObj))
}

export const deletePost = postId => async dispatch => {
  
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  })
  
  dispatch(removePost(postId))
  // return res
}
/*
Export a `postsReducer` function as the default export. It should take in the
old state and an action. It should appropriately handle all post actions, as
defined in the test specs.
*/

export default function postsReducer(prev = {}, action) {
  const state = {...prev}
  console.log("action:", action)
  console.log("prev:", prev)
  // console.log("action:", action)
  // console.log("state:", state)
  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...action.posts}
    case RECEIVE_POST:
      
      state[action.post.id] = action.post
      
      return state
    case REMOVE_POST:
      delete state[action.postId]
      return state
    default:
      return prev
    }
}

