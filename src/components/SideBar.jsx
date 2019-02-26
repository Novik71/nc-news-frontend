import React from 'react'
import PropTypes from 'prop-types'
import voteUp from "../images/vote-up.png";
import voteDown from "../images/vote-down.png";

const SideBar = ({ handleVote, fakeVotes, loggedInUser }) => {
    return (
        <div className="side_bar">
            <div className="spacer_div"></div>
            <button className="vote_button" disabled={!loggedInUser ? true : false} onClick={() => { handleVote('up') }}><span aria-label="thumbs up" role="img"><img src={voteUp} height="25px" alt=""/></span></button>
            <p className="vote_count">{fakeVotes}</p>
            <button className="vote_button" disabled={!loggedInUser ? true : false} onClick={() => { handleVote('down') }}><span aria-label="thumbs up" role="img"><img src={voteDown} height="25px" alt="" /></span></button>
            <div className="spacer_div"></div>
        </div>
    )
}

SideBar.propTypes = {
    handleVote: PropTypes.func.isRequired,
    fakeVotes: PropTypes.number.isRequired,
    loggedInUser: PropTypes.object
}

export default SideBar

