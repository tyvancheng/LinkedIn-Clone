import { RECEIVE_POSTS } from "./posts";

const OPEN_POST_UPDATE_MODAL = 'modal/OPEN_POST_UPDATE_MODAL';
const OPEN_POST_CREATE_MODAL = 'modal/OPEN_POST_CREATE_MODAL';
const FORCE_MODAL_CLOSE = 'modal/FORCE_MODAL_CLOSE';

export const open_post_update_modal = () => { return { type: OPEN_POST_UPDATE_MODAL } }
export const open_post_create_modal = () => { return { type: OPEN_POST_CREATE_MODAL } }
export const force_modal_close = () => { return { type: FORCE_MODAL_CLOSE } }

const UIreducer = (prevstate = { modal: null }, action) => {
    Object.freeze(prevstate);
    const state = { ...prevstate }

    switch (action.type) {
        case OPEN_POST_UPDATE_MODAL:
            return { modal: "open_post_update_modal" }

        case OPEN_POST_CREATE_MODAL:
            return { ...state, modal: "open_post_create_modal" }

        case RECEIVE_POSTS:
        case FORCE_MODAL_CLOSE:
            return { ...state, modal: null }

        default:
            return state
    }
}

export default UIreducer;