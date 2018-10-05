import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SideBar from './SideBar'
import moment from 'moment'
const api = require('../api');


export default class SingleComment extends Component {

    state = {
        fakeVotes: 0
    }

    render() {
        const { comment } = this.props;
        return (
            <div className="comment" >
                <div className="comment_main">
                    <span className="comment_user">{comment.created_by.username}</span>
                    <span className="comment_date"> {moment(comment.created_at).fromNow()}</span><br /><br />
                    {comment.body}
                </div>
                <SideBar handleVote={this.handleVote} fakeVotes={this.state.fakeVotes} />
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            fakeVotes: this.props.comment.votes
        })
    }

    handleVote = (voteDir) => {
        const comment_id = this.props.comment._id;
        return api.voteComment(voteDir, comment_id)
            .then(() => {
                const { fakeVotes } = this.state;
                let newFakeVotes = voteDir === 'up' ? fakeVotes + 1 : fakeVotes - 1;
                this.setState({
                    fakeVotes: newFakeVotes
                })
            })
    }
}

SingleComment.propTypes = {
    comment: PropTypes.object,
    key: PropTypes.string
}