import icon from '../../images/icons8-male-user-50.png';
import './commentInPost.css'

export default function CommentInPost({ comment }) {
    debugger
    return (
        <>
            <div className='comment-container'>
                <img src={icon} className='comment-profile-image'></img>
                <div className='comment-credentials-and-body-container'>
                   <div className='comment-author-name'>{`${comment.author.first_name} ${comment.author.last_name}`}</div>
                    {comment.author.bio && <div className='comment-author-bio'>{comment.author.bio}</div>}
                    <div className='comment-body'>{comment.body}</div>
                </div>
            </div>
        </>
    )
}