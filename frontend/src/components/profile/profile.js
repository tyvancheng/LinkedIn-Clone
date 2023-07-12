import NavBar from "../navbar/navbar"
import banner from '../../images/banner.png'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { showUser } from "../../store/session"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { ComingSoon } from "../progress/comingSoonModal"
import { open_coming_soon_modal } from "../../store/ui"
import maleIcon from '../../images/icons8-male-user-50.png';
import './profile.css'

export const Profile = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.profilePageUser)
    const currentUser = useSelector(state => state.session.user)

    const handleProgressModal = () => {
        dispatch(open_coming_soon_modal())
    }
    useEffect(() => {
        dispatch(showUser(id));
    },[]);

    return (
        <>
            <div className="feed-page">

                <div className="feed-page-nav">
                    <div className="feed-page-nav-content">
                        {/* {NavBar()} */}
                        <NavBar />
                    </div>
                </div>

                <div className="feed-page-main">
                    <div className="center-profile-main-page">
                    <div className="profile-main-page-left">
                        <div className="profile-main-page-header">
                        <ComingSoon />
                            <img id="banner" src={banner}></img>
                            <div className="profile-main-page-picture-container">
                                {user && <img className="profile-main-page-picture" src={user.profilePictureUrl} alt="image"></img>}              
                            </div>
                            {user && <div className="profile-main-page-name">{`${user.firstName} ${user.lastName}`}</div>}
                            {user && <div className="profile-main-page-bio">{user.bio}</div>}
                            {user && <div className="profile-main-page-location">United States</div>}
                            {user && <div className="profile-main-page-connections-num">500+ connections</div>}
                            {currentUser.id !== parseInt(id) && 
                            <div className="profile-button-container">
                                <button className="profile-follow-button" onClick={handleProgressModal}>Follow</button>
                                <button className="profile-message-button" onClick={handleProgressModal}>Message</button>
                            </div> }
                            <ComingSoon />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}