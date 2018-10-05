import React, { Component } from 'react'
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
                <span grid-area="heading"><h3>Post a New Article</h3><span className="current_topic">Topic: {topicName}</span></span><span>Posting as <strong>{this.props.user.username}</strong></span>
                <form className="article_add_form">
                    <div className="title_input"><label>Title:</label><textarea onChange={this.handleTitleChange} /></div>
                    <textarea className="body_input" onChange={this.handleBodyChange}></textarea>
                </form>
                <button className="post_button" onClick={this.handlePost}>Post</button>
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
        const created_by = this.props.user._id;
        return api.addArticle(title, body, created_by, topic)
    }

}

ArticleAdd.propTypes = {
    user: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}