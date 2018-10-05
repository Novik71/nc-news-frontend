import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api'

export default class CommentAdd extends Component {
    state = {
        body: ''
    }
    render() {
        return (
            <div className="comment_add_container">
                <form className="comment_add_form">
                    <textarea className="comment_body_input" placeholder="Add a comment..." onChange={this.handleBodyChange} />
                </form>
                <button className="post_button" onClick={this.handlePost}>Post</button>
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
        const created_by = this.props.user._id;
        return api.addComment(article_id, body, created_by)
            .then(() => {
                this.setState({
                    body: ''
                })
            })
    }
}

CommentAdd.propTypes = {
    user: PropTypes.object.isRequired,
    article_id: PropTypes.string.isRequired,
    handleAddComment: PropTypes.func.isRequired
};