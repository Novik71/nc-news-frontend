import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleList from './ArticleList';
import SiteInfo from './SiteInfo';

export default class Home extends Component {
    render() {
        return (
            <div className="home_page_container">
                <ArticleList />
                <SiteInfo />
            </div>
        )
    }
}

Home.propTypes = {

}
