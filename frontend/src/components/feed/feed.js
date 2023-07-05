import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/session";
import { useHistory } from "react-router-dom";
import PostIndex from "../post/postIndex";
import { logoutUser } from "../../store/session";
import NavBar from "../navbar/navbar";
import "./feed.css"


const Feed = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user);
    //     if (user.id !== 



    return (
        <div className="feed-page">

            <div className="feed-page-nav">
                <div className="feed-page-nav-content">
                    {/* {NavBar()} */}
                    <NavBar/>
                </div>
            </div>

            <div className="feed-page-main">

                {/* <div className="feed-page-main-left">
                    <div>
                        
                    </div>
                </div> */}
                
                <div className="feed-page-main-index">
                    {/* {PostIndex()} */}
                    <PostIndex />
                </div>
            </div>

        </div>
    )
}

export default Feed;