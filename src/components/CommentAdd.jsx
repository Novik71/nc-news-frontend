import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'

export default class CommentAdd extends Component {
    state = {
        body: '',
    }
    render() {
        return (
            <div className="comment_add_container">
                <form className="comment_add_form">
                    <textarea className="comment_body_input" placeholder={this.props.loggedInUser ? "Add a comment..." : "You must be logged in to comment"} value={this.state.body} onChange={this.handleBodyChange} />
                </form>
                <button className="post_button" disabled={!this.props.loggedInUser ? true : false} onClick={this.props.loggedInUser ? this.handlePost : this.notice}>Post Comment</button>
            </div>
        );
    }

    handleBodyChange = (event) => {
        const body = event.target.value;
        return this.setState({
            body
        })
    }

    handlePost = () => {
        const { article_id } = this.props;
        const { body } = this.state;
        const created_by = this.props.loggedInUser._id;
        api.addComment(article_id, body, created_by)
            .then((newComment) => {
                return this.props.handleAddComment(newComment)
            })
        this.setState({
            body: ''
        })
    }
}

CommentAdd.propTypes = {
    loggedInUser: PropTypes.object,
    article_id: PropTypes.string.isRequired,
    handleAddComment: PropTypes.func.isRequired
};