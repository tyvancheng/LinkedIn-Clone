import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './usersReducer';


export const rootReducer = combineReducers({
    users: userReducer
})


export default function configureStore(preloadedState = {}) {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}

