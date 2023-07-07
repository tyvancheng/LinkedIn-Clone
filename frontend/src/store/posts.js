import { csrfFetch } from "./csrf";

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS'
export const RECEIVE_POST = 'posts/RECEIVE_POST'
export const REMOVE_POST = 'posts/REMOVE_POST'
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

//Actions
export const receivePosts = posts => { return { type: RECEIVE_POSTS, posts } }

export const receivePost = post => { return { type: RECEIVE_POST, post } }

export const removePost = postId => { return { type: REMOVE_POST, postId } }

export const likePostSuccess = (postId, like) => { return { type: LIKE_POST_SUCCESS, postId, like } };

export const unlikePostSuccess = (postId, likerId) => { return { type: UNLIKE_POST_SUCCESS, postId, likerId } };

export const receiveComment = (postId, comment) => { return { type: RECEIVE_COMMENT, postId, comment } }

export const removeComment = (postId, comment) => { return { type: REMOVE_COMMENT, postId, comment } }

export const updateComment = (postId, comment) => { return { type: UPDATE_COMMENT, postId, comment } }
//Selectors
export const getPost = postId => (state) => state.posts ? state.posts[postId] : null

export const getPosts = state => {
  return state.posts ? Object.values(state.posts).sort((a, b) => {
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

  const { body, author_id } = post
  const res = await csrfFetch(`/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body, author_id })
  });

  const postObj = await res.json();

  dispatch(receivePost(postObj.post));
};

export const updatePost = post => async dispatch => {

  const { body, author_id, id } = post

  const res = await csrfFetch(`/api/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body, author_id })
  })
  const postObj = await res.json()
  dispatch(receivePosts(postObj))
}

export const deletePost = postId => async dispatch => {

  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  })

  dispatch(removePost(postId))
}

export const likePost = (postId) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  dispatch(likePostSuccess(postId, data));
};

export const unlikePost = (postId, likeId) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}/likes/${likeId}`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  dispatch(unlikePostSuccess(postId, data));
};

export const addComment = (postId, body) => async dispatch => {
  debugger
  const res = await csrfFetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  })

  const data = await res.json()
  dispatch(receiveComment(postId, data));
}

export const deleteComment = (postId, commentId) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE'
  })

  const data = await res.json()
  dispatch(removeComment(postId, data));
}

export const editComment = (postId, commentId, body) => async dispatch => {
  const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ body })
  })
  const data = await res.json()
  console.log("edit:", data)
  debugger
  dispatch(updateComment(postId, data))
}
export default function postsReducer(prev = {}, action) {
  const state = { ...prev };

  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...action.posts };
    case RECEIVE_POST:
      state[action.post.id] = action.post;
      return state;
    case REMOVE_POST:
      delete state[action.postId];
      return state;
    case LIKE_POST_SUCCESS:
      if (state[action.postId].likes) {
        state[action.postId].likes[action.like.likerId] = action.like
      } else {
        state[action.postId].likes = ({})
        state[action.postId].likes[action.like.likerId] = action.like
      }
      return state
    case UNLIKE_POST_SUCCESS:
      if (state[action.postId].likes) {
        delete state[action.postId].likes[action.likerId]
      } else {
        state[action.postId].likes = ({})
      }
      return state
    case RECEIVE_COMMENT:
      if (state[action.postId].comments) {
        state[action.postId].comments[action.comment.id] = action.comment
      } else {
        state[action.postId].comments = ({})
        state[action.postId].comments[action.comment.id] = action.comment
      }
      return state
    case UPDATE_COMMENT:
      if (state[action.postId].comments && state[action.postId].comments[action.comment.id]) {
        state[action.postId].comments[action.comment.id] = {
          ...state[action.postId].comments[action.comment.id],
          body: action.comment.body
        };
      }
      return state;
    case REMOVE_COMMENT:
      if (state[action.postId].comments) {
        delete state[action.postId].comments[action.comment.id]
      } else {
        state[action.postId].comments = ({})
      }
      return state
    default:
      return prev;
  }
}

