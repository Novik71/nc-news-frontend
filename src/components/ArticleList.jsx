import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bodyPreview } from '../utils/utils';
const api = require('../api');

export default class ArticleList extends Component {

    state = {
        articles: []
    }

    render() {
        const topicName = this.props.topic ? this.props.topic.replace(/^\w/, c => c.toUpperCase()) : '';
        return (
            <div className="article_list">
                <h3>Most Popular {topicName} Articles</h3>
                <div >
                    <ul>
                        {this.state.articles.map(article => {
                            return (
                                <li className="article_list_item" key={article._id} >
                                    <Link to={`/articles/${article._id}`}>
                                        <h4 className="article_list_title">{article.title}</h4>
                                        <p className="article_list_body">{bodyPreview(article.body)}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        return api.fetchArticles(this.props.topic)
            .then((articles) => {
                return this.setState({
                    articles
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topic !== this.props.topic) {
            return api.fetchArticles(this.props.topic)
                .then((articles) => {
                    return this.setState({
                        articles
                    })
                })
        }
    }
}

ArticleList.propTypes = {
    topic: PropTypes.string
}