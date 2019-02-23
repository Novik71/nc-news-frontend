import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import * as api from '../api';

export default class ArticleAdd extends Component {

    state = {
        topic: '',
        title: '',
        body: '',
        articleAddedId: null
    }

    render() {
        const topic = this.props.match.params.topic_id;
        console.log(topic)
        const topicName = topic ? topic.replace(/^\w/, c => c.toUpperCase()) : '';
        return (
            <div className="article_add_container">
                {/* this.state.articleAddedId && <Redirect to={`/articles/${this.state.articleAddedId}`} /> */}
                <h3 className="article_add_heading">Post Article</h3><span className="current_topic">Topic: {topicName ? topicName : 'Technology'}</span>
                {this.props.loggedinUser && <span className="posting_as">Posting as <strong>{this.props.loggedinUser.username}</strong></span>}
                {!this.props.loggedInUser && <span className="posting_as"><strong>Please log in to post</strong></span>}
                <form className="article_add_form">
                    <div id="title_input"><label id="title_input_label">Title:</label><textarea id="title_input_text_area" onChange={this.handleTitleChange} /></div>
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
                if (status === 201) return this.setRedirect(data._doc._id);
            })
            .catch(err => console.log(err))
    }

    setRedirect = (id) => {
        this.setState({
            articleAddedId: id
        })
    }

    componentWillMount() {
        console.log('Component will mount')
    }

    handleRedirect = () => {
        if (this.state.articleAddedId) {
            return (
                <Redirect to={`/articles/${this.state.articleAddedId}`} />
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.articleAddedId !== prevState.articleAddedId) {
            this.handleRedirect()
        }
    }
}

ArticleAdd.propTypes = {
    loggedinUser: PropTypes.object,
    match: PropTypes.object.isRequired
}