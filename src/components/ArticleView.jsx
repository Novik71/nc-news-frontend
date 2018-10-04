import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CommentsSection from './CommentsSection';
import SideBar from './SideBar';
const api = require('../api');

export default class ArticleView extends Component {

    state = {
        article: null,
        comments: [],
        voteModifier: 0
    }

    render() {
        if (!this.state.article) return null;
        else {
            const { title, created_by, created_at, body, votes } = this.state.article;
            const date = moment(created_at).format("Do MMMM YYYY");
            return (
                <div className="article_container">
                    <SideBar votes={votes} handleVote={this.handleVote} voteModifier={this.state.voteModifier} />
                    <div className="article">
                        <h2>{title}</h2>
                        <span className="by_line">{`by ${created_by.name}`}</span><br />
                        <span className="article_date">{date}</span>
                        <p>{body}</p><br />
                        <CommentsSection handleVotes={this.handleVotes} comments={this.state.comments} />
                    </div>
                </div >
            )
        }
    }

    handleVote = (voteDir) => {
        const article_id = this.state.article._id;
        return api.voteArticle(voteDir, article_id)
            .then(() => {
                return this.setState({
                    voteModifier: voteDir === 'up' ? 1 : -1
                })
            })
    }

    componentDidMount() {
        const { article_id } = this.props.match.params;
        return api.fetchSingleArticleAndComments(article_id)
            .then(([article, comments]) => {
                if (article.hasOwnProperty('title')) {
                    return this.setState({
                        article, comments
                    })
                }
            })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.article_id !== this.props.article_id
            || prevState.voteModifier !== this.state.voteModifier) {
            return this.setState({
                article: { ...this.state.article, votes: prevState.article.votes + this.state.voteModifier }
            })
        }
    }
}

