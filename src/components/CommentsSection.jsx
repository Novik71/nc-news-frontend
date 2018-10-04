import React from 'react'
import PropTypes from 'prop-types'
import SingleComment from './SingleComment'

const CommentsSection = ({ comments }) => {
    return (
        <div className="comments_section">
            <h4>{comments.length} comments</h4>
            {comments.map(comment => {
                return <SingleComment comment={comment} key={comment._id} />
            })}
        </div>
    )
}

CommentsSection.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentsSection

