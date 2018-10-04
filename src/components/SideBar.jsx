import React from 'react'
import PropTypes from 'prop-types'

const SideBar = ({ handleVote, votes, voteModifier }) => {
    return (
        <div className="side_bar">
            <button className="vote_button" onClick={() => { handleVote('up') }}><span aria-label="thumbs up" role="img">👍</span></button>
            <p className="vote_count">{votes + voteModifier}</p>
            <button className="vote_button" onClick={() => { handleVote('down') }}><span aria-label="thumbs up" role="img">👎</span></button>
        </div>
    )
}

SideBar.propTypes = {
    handleVote: PropTypes.func.isRequired,
    votes: PropTypes.number.isRequired,
    voteModifier: PropTypes.number.isRequired
}

export default SideBar

