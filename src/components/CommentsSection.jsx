import React from 'react'
import PropTypes from 'prop-types'
import SingleComment from './SingleComment'

const CommentsSection = ({ loggedInUser, comments }) => {
    const sortedComments = comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return (
        <div className="comments_section">
            <h4>{comments.length} comments</h4>
            {sortedComments.map(comment => {
                return <SingleComment loggedInUser={loggedInUser} comment={comment} key={comment._id} />
            })}
        </div>
    )
}

CommentsSection.propTypes = {
    comments: PropTypes.array.isRequired,
    loggedInUser: PropTypes.object
}

export default CommentsSection

