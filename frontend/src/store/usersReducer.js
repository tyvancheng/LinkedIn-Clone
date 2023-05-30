    import { csrfFetch } from "./csrf";
    // ACTION TYPES
    const RECEIVE_USER = 'users/RECEIVE_USER';
    const REMOVE_USER = 'users/REMOVE_USER';

    // ACTION CREATORS
    export const receiveUser = user => ({
        type: RECEIVE_USER,
        payload: user
    });

    export const removeUser = userId => ({
        type: REMOVE_USER,
        userId // userId: userId
    });

 
    // THUNK ACTION CREATORS
    export const loginUser = user => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        debugger
        console.log(data.user)
        dispatch(receiveUser(data.user))
    };

    export const logoutUser = userId => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'DELETE'
        });
        sessionStorage.setItem('currentUser', null)
        dispatch(removeUser(userId));
    }

    export const createUser = user => async dispatch => {
        let res = await csrfFetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user)
        });
        let data = await res.json();
        sessionStorage.setItem('currentUser', JSON.stringify(data.user));
        dispatch(receiveUser(data.user));
    }

    // REDUCER
    const userReducer = ( state = {}, action ) => {
        const nextState = { ...state };
        console.log(action)
        switch(action.type) {
            case RECEIVE_USER:
                if (action.user) {
                    nextState["currentUserId"] = action.user.id;
                } else {
                    nextState["currentUserId"] = null;
                }
                return nextState;
            case REMOVE_USER:
                nextState["currentUserId"] = null;
                return nextState;
            default:
                return state;
        }
    };

    export default userReducer