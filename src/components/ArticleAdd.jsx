import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ArticleAdd extends Component {

    state = {
        topic: '',
        currentText: ''
    }

    render() {
        const { topic } = this.props.match.params;
        console.log(topic, '<<<<<<<<<<<')
        return (
            <div className="article_add">
                <p>post new {topic} article here!</p>
            </div>
        )
    }
}

ArticleAdd.propTypes = {
    match: PropTypes.object.isRequired
}