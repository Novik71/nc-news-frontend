import React, { Component } from 'react';

export default class ArticleSearch extends Component {

    state = {
        currentText : ''
    }

    render() {
        return (
            <div>
                <form className="article_search" onChange={(e) => this.props.handleChange(e)} onSubmit={this.props.handleSubmit} >
                    <label>Search articles:</label>
                    <input type="text" className="article_search_input" name="article_search_input" />
                    <br />
                </form>
            </div>
        );
    }

}

