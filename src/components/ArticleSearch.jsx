import React, { Component } from 'react';

export default class ArticleSearch extends Component {

    state = {
        currentText: ''
    }

    render() {
        return (
            <div>
                <form className="article_search" onChange={this.handleChange} onSubmit={this.props.handleSubmit}>
                    <label>Search articles:</label>
                    <input type="text" name="article_search_input" />
                    <br />
                </form>
            </div>
        );
    }

    handleChange = (e) => {
        return console.log(e.target, '<<<handleChangetarget')
    }
}

