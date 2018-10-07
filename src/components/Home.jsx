import React, { Component } from 'react';
import ArticleList from './ArticleList';

export default class Home extends Component {
    render() {
        return (
            <div className="home_page_container">
                <ArticleList />
            </div>
        )
    }
}

