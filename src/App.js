import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import TopicPage from './components/TopicPage';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import LoginControl from './components/LoginControl';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="app_head_grid">
          <LoginControl />
          <div className="app_head_inner_grid"><h1><Link to='/'>nc news</Link></h1>
            <nav>
              <Link to='/topics/coding'>Coding</Link>
              {"  |   "}
              <Link to='/topics/football'>Football</Link>
              {"  |  "}
              <Link to='/topics/cooking'>Cooking</Link>
            </nav>
          </div>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/topics/:topic' render={({ match }) => <TopicPage match={match} />} />
        <Route path='/articles/:article_id' render={({ match }) => <ArticleView match={match} />} />


      </div>
    );
  }
}

export default App;
