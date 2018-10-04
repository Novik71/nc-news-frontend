import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SideBar from './SideBar'
import moment from 'moment'
const api = require('../api');


export default class SingleComment extends Component {

    state = {
        voteModifier: 0
    }

    render() {
        const { comment } = this.props;
        return (
            <div className="comment" key={comment._id}>
                <div className="comment_main">
                    <span className="comment_user">{comment.created_by.username}</span>
                    <span className="comment_date"> {moment(comment.created_at).fromNow()}</span><br /><br />
                    {comment.body}
                </div>
                <SideBar handleVote={this.handleVote} votes={comment.votes} voteModifier={this.state.voteModifier} />
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.voteModifier !== this.state.voteModifier) {
            return console.log(this.state.voteModifier)
        }
    }

    handleVote = (voteDir) => {
        const comment_id = this.props.comment._id;
        return api.voteComment(voteDir, comment_id)
            .then(() => {
                return this.setState({
                    voteModifier: voteDir === 'up' ? 1 : -1
                })
            })
    }
}

SingleComment.propTypes = {
    comment: PropTypes.object,
    key: PropTypes.string
}