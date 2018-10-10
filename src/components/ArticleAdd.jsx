import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import * as api from '../api';

export default class ArticleAdd extends Component {

    state = {
        topic: '',
        title: '',
        body: ''
    }

    render() {
        const topic = this.props.match.params.topic_id;
        const topicName = topic ? topic.replace(/^\w/, c => c.toUpperCase()) : '';
        return (
            <div className="article_add_container">
                <h3 className="article_add_heading">Post Article</h3><span className="current_topic">Topic: {topicName ? topicName : 'Coding'}</span>
                {this.props.loggedinUser && <span className="posting_as">Posting as <strong>{this.props.loggedinUser.username}</strong></span>}
                {!this.props.loggedInUser && <span className="posting_as"><strong>Please log in to post</strong></span>}
                <form className="article_add_form">
                    <div className="title_input"><label>Title:</label><textarea onChange={this.handleTitleChange} /></div>
                    <textarea className="body_input" onChange={this.handleBodyChange}></textarea>
                </form>
                <button className="post_button" disabled={!this.props.loggedInUser ? true : false} onClick={this.handlePost}>Post</button>
            </div>
        )
    }

    handleTitleChange = (event) => {
        const title = event.target.value;
        return this.setState({
            title
        })
    }

    handleBodyChange = (event) => {
        const body = event.target.value;
        return this.setState({
            body
        })
    }

    handlePost = () => {
        const topic = this.props.match.params.topic_id;
        const { title, body } = this.state;
        const created_by = this.props.loggedInUser._id;
        return api.addArticle(title, body, created_by, topic)
            .then(({ data, status }) => {
                if (status === 201) return this.handleRedirect(data._doc._id);
            })
            .catch(err => console.log(err))
    }

    handleRedirect = (id) => {
        console.log(id, '<<<<')
        return (
            <Redirect to={`/articles/${id}`} />
        )
    }

}

ArticleAdd.propTypes = {
    loggedinUser: PropTypes.object,
    match: PropTypes.object.isRequired
}