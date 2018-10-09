import React from 'react'
import PropTypes from 'prop-types'

const SideBar = ({ handleVote, fakeVotes, loggedInUser }) => {
    return (
        <div className="side_bar">
            <button className="vote_button" disabled={!loggedInUser ? true : false} onClick={() => { handleVote('up') }}><span aria-label="thumbs up" role="img">👍</span></button>
            <p className="vote_count">{fakeVotes}</p>
            <button className="vote_button" disabled={!loggedInUser ? true : false} onClick={() => { handleVote('down') }}><span aria-label="thumbs up" role="img">👎</span></button>
        </div>
    )
}

SideBar.propTypes = {
    handleVote: PropTypes.func.isRequired,
    fakeVotes: PropTypes.number.isRequired,
    loggedInUser: PropTypes.object
}

export default SideBar

