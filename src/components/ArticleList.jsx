import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bodyPreview } from '../utils/utils';
import ArticleSearch from './ArticleSearch';
import TopicSelect from './TopicSelect';
const api = require('../api');

export default class ArticleList extends Component {

    state = {
        articles: []
    }

    render() {
        const { topic } = this.props;
        const topicName = topic ? topic.replace(/^\w/, c => c.toUpperCase()) : '';
        return (
            <div className="article_list">
                <h2 className="article_list_head">Most Popular {topicName} Articles</h2>
                <span><ArticleSearch handleSubmit={this.handleSubmit} /></span>
                {topic && <button className="article_add_button"><Link to={`${topic}/articles/new`}>Create New {topicName} Article</Link></button>}
                {!topic && <TopicSelect />}
                <div className="article_list_scroll">
                    <ul>
                        {this.state.articles && this.state.articles.map(article => {
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

    handleSubmit = (e) => {
        return console.log(e, '<<**<<')
    }
}

ArticleList.propTypes = {
    topic: PropTypes.string
}