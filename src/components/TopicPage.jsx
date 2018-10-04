import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';

export default class TopicPage extends Component {
    render() {
        const { topic } = this.props.match.params;
        return (
            <div>
                <ArticleList topic={topic} />
            </div>
        )
    }
}

TopicPage.propTypes = {
    match: PropTypes.object.isRequired
}