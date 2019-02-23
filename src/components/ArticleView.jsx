import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            const { title, created_by, created_at, body, _id } = this.state.article;
            const date = moment(created_at).format("Do MMMM YYYY");
            const { loggedInUser } = this.props;
            let ownArticle;
            if (loggedInUser) {
                ownArticle = loggedInUser.username === created_by.username ? true : false
            }
            return (
                <div className="article_container">
                    <SideBar handleVote={this.handleVote} loggedInUser={this.props.loggedInUser} fakeVotes={this.state.fakeVotes} />
                    <div className="article">
                        <h2>{title}</h2>
                        <span><button id="article_delete_button" onClick={() => this.handleDelete(_id)} hidden={ownArticle ? false : true}>Delete</button></span><br />
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
        const voteValue = voteDir === 'up' ? 1 : -1;
        this.setState({
            voteValueThisRefresh: this.state.voteValueThisRefresh + voteValue
        })
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
        } else {
            console.log("You must be logged in to vote!");
        } 
    }

    handleDelete = (article_id) => {
        return api.deleteArticle(article_id)
            .then(([data, status]) => {
                if (/^2+/gm.test(status)) {
                    console.log('Article successfully deleted')
                    return (
                        <Redirect to='/' />
                    )
                } else {
                    return (
                        <Redirect to='/' />
                    )
                }
            })
    }

    componentDidMount() {
        const { article_id } = this.props.match.params;
        return api.fetchSingleArticleAndComments(article_id)
            .then(([article, comments]) => {
                if (!article) {
                    console.log('Article does not exist')
                    return (
                        <Redirect to='/' />
                    )
                } else if (article.hasOwnProperty('title')) {
                    return this.setState({
                        article, comments, fakeVotes: article.votes
                    })
                } else {
                    return (
                        <Redirect to='/' />
                    )
                }
            })
    }

    componentDidUpdate(prevProps, prevState) {
        const { article_id } = this.props.match.params;
        if (this.state.newComments !== prevState.newComments) {
            return api.fetchSingleArticleAndComments(article_id)
                .then(([article, comments]) => {
                    if (!article) {
                        console.log('Article does not exist')
                        return (
                            <Redirect to='/' />
                        )
                    } else if (article.hasOwnProperty('title')) {
                        return this.setState({
                            article, comments, fakeVotes: article.votes
                        })
                    }
                })
        } else if (this.props.loggedInUser) {
            return api.fetchSingleArticleAndComments(article_id)
                .then(([article, comments]) => {
                    if (!article) {
                        console.log('Article does not exist')
                        return (
                            <Redirect to='/' />
                        )
                    } else if (article.hasOwnProperty('title')) {
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
    match: PropTypes.object.isRequired,
}

