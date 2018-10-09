import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommentsSection from './CommentsSection';
import SideBar from './SideBar';
import * as api from '../api';
import CommentAdd from './CommentAdd';


export default class ArticleView extends Component {

    state = {
        article: null,
        comments: [],
        fakeVotes: 0,
    }

    render() {
        if (!this.state.article) return null;
        else {
            const { title, created_by, created_at, body } = this.state.article;
            const date = moment(created_at).format("Do MMMM YYYY");
            return (
                <div className="article_container">
                    <SideBar handleVote={this.handleVote} loggedInUser={this.props.loggedInUser} fakeVotes={this.state.fakeVotes} />
                    <div className="article">
                        <h2>{title}</h2>
                        <span className="by_line">{`by ${created_by.name}`}</span><br />
                        <span className="article_date">{date}</span>
                        <p>{body}</p><br />
                        <CommentAdd loggedInUser={this.props.loggedInUser} article_id={this.state.article._id} handleAddComment={this.handleAddComment} />
                        <CommentsSection loggedInUser={this.props.loggedInUser} handleVotes={() => { this.handleVotes() }} comments={this.state.comments} />
                    </div>
                </div >
            )
        }
    }

    handleAddComment = (newComment) => {
        return this.setState({
            comments: this.state.comments.concat(newComment)
        })
    }

    handleVote = (voteDir) => {
        if (this.props.loggedInUser) {
            const article_id = this.state.article._id;
            return api.voteArticle(voteDir, article_id)
                .then(() => {
                    const { fakeVotes } = this.state;
                    let newFakeVotes = voteDir === 'up' ? fakeVotes + 1 : fakeVotes - 1;
                    this.setState({
                        fakeVotes: newFakeVotes
                    })
                })
        }
    }

    componentDidMount() {
        const { article_id } = this.props.match.params;
        return api.fetchSingleArticleAndComments(article_id)
            .then(([article, comments]) => {
                if (article.hasOwnProperty('title')) {
                    return this.setState({
                        article, comments, fakeVotes: article.votes
                    })
                }
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props.match.params;
        if (this.state.newComments !== prevState.newComments) {
            return api.fetchSingleArticleAndComments(article_id)
                .then(([article, comments]) => {
                    if (article.hasOwnProperty('title')) {
                        return this.setState({
                            article, comments, fakeVotes: article.votes
                        })
                    }
                })
        } else if (this.props.loggedInUser) {
            return api.fetchSingleArticleAndComments(article_id)
                .then(([article, comments]) => {
                    if (article.hasOwnProperty('title')) {
                        return this.setState({
                            article, comments, fakeVotes: article.votes
                        })
                    }
                })
        }
    }
}

ArticleView.propTypes = {
    loggedInUser: PropTypes.object,
    match: PropTypes.object.isRequired
}

