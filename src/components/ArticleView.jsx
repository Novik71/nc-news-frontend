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
        fakeVotes: 0
    }

    render() {
        if (!this.state.article) return null;
        else {
            const { title, created_by, created_at, body } = this.state.article;
            const date = moment(created_at).format("Do MMMM YYYY");
            return (
                <div className="article_container">
                    <SideBar handleVote={this.handleVote} fakeVotes={this.state.fakeVotes} />
                    <div className="article">
                        <h2>{title}</h2>
                        <span className="by_line">{`by ${created_by.name}`}</span><br />
                        <span className="article_date">{date}</span>
                        <p>{body}</p><br />
                        <CommentsSection handleVotes={() => { this.handleVotes() }} comments={this.state.comments} />
                    </div>
                </div >
            )
        }
    }

    handleVote = (voteDir) => {
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


}

