import { useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { loginUser } from "../../store/session";
import { useHistory } from "react-router-dom";
import PostIndex from "../post/postIndex";
import { logoutUser } from "../../store/session";
import NavBar from "../navbar/navbar";
import "./feed.css"


const Feed = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    //     if (user.id !== 


    const handleLogout = () => {
        dispatch(logoutUser(user.id));
        history.push("/");
    }
    return (
        <div className="feed">
            {NavBar()}
            <button onClick={handleLogout}>logout</button>
            {PostIndex()}
        </div>
    )
}

export default Feed;