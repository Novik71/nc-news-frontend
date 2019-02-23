import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SideBar from './SideBar'
import moment from 'moment'
import * as api from '../api';


export default class SingleComment extends Component {

    state = {
        fakeVotes: 0
    }

    render() {
        const { comment } = this.props;
        const { loggedInUser } = this.props;
        let ownComment;
        if (loggedInUser) {
            ownComment = loggedInUser.username === comment.created_by.username ? true : false
        }
        return (
            <div className="comment" >
                <div className="comment_main">
                    <span className="comment_user">{comment.created_by.username}</span>
                    <span className="comment_date"> {moment(comment.created_at).fromNow()}</span>
                    <span><button id="comment_delete_button" onClick={() => this.handleDelete(comment._id)} hidden={ownComment ? false : true}>Delete</button></span><br />
                    <p className="comment_body">{comment.body}</p>
                </div>
                <SideBar loggedInUser={this.props.loggedInUser} handleVote={this.handleVote} fakeVotes={this.state.fakeVotes} />
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            fakeVotes: this.props.comment.votes
        })
    }

    handleVote = (voteDir) => {
        if (this.props.loggedInUser) {
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

    handleDelete = (comment_id) => {
        return api.deleteComment(comment_id);
    }
}

SingleComment.propTypes = {
    comment: PropTypes.object,
    key: PropTypes.string,
    loggedInUser: PropTypes.object
}