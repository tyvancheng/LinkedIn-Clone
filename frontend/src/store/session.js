    import { csrfFetch } from "./csrf";
    // ACTION TYPES
    const SET_CURRENT_USER = 'session/SET_CURRENT_USER';
    const REMOVE_USER = 'session/REMOVE_USER';

    // ACTION CREATORS
    export const setCurrentUser = user => ({
        type: SET_CURRENT_USER,
        payload: user
    });

    export const removeUser = userId => ({
        type: REMOVE_USER,
        userId // userId: userId
    });

 
    // THUNK ACTION CREATORS
    export const loginUser = user => async dispatch => {
        try {
            let res = await csrfFetch('/api/session', {
                method: 'POST',
                body: JSON.stringify(user)
            });
            if (res.ok) {
                let data = await res.json();
                if (data.errors) throw data

                storeCurrentUser(data.user);
                dispatch(setCurrentUser(data.user))
            }
        } catch (err) {
            throw err;
        }
    };

    export const logoutUser = userId => async dispatch => {
        let res = await csrfFetch('/api/session', {
            method: 'DELETE'
        });
        if (res.ok) {
            sessionStorage.setItem('currentUser', null)
            dispatch(removeUser(userId));
        }
    }

    export const createUser = user => async dispatch => {
        // try {
            let res = await csrfFetch('/api/users', {
                method: "POST",
                body: JSON.stringify(user)
            });
    
            if (res.ok) {
                let data = await res.json();
                if (data.errors) throw data;
                storeCurrentUser(data.user)
                dispatch(setCurrentUser(data.user))
            } else {
                throw res
            }
        // } catch (err) {
        //     let errors = await err.json();
        //     throw errors
        // }
    }

  //Session User
  
  export const restoreSession = () => async (dispatch) => {
    const res = await fetch('/api/session');

    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);

    return res;

}
    //Helper Functions
    const storeCSRFToken = response => {
        const Token = response.headers.get("X-CSRF-Token");
        if (Token) sessionStorage.setItem("X-CSRF-Token", Token);
    }

    const storeCurrentUser = user => {
        if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
        else sessionStorage.removeItem("currentUser");
    }   

    // REDUCER
    const prev = {
        user: JSON.parse(sessionStorage.getItem("currentUser"))
    };

    const sessionReducer = ( state = prev, action ) => {
        Object.freeze(state);
        const nextState = { ...state };

        switch(action.type) {
            case SET_CURRENT_USER:
                return { ...nextState, user: action.payload }

            case REMOVE_USER:
                return { ...nextState, user: null};

            default:
                return state;
        }
    };

    export default sessionReducer