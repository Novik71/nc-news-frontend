import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import TopicPage from './components/TopicPage';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import LoginControl from './components/LoginControl';
import TopicNav from './components/TopicNav';
import ArticleAdd from './components/ArticleAdd';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="app_head_grid">
          <LoginControl />
          <div className="app_head_inner_grid"><h1><Link to='/'>nc news</Link></h1>
            <TopicNav />
          </div>
        </div>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/topics/:topic' render={({ match }) => <TopicPage match={match} />} />
          <Route exact path='/topics/:topic_id/articles/new' render={({ match }) => <ArticleAdd match={match} />} />
          <Route path='/articles/:article_id' render={({ match }) => <ArticleView match={match} />} />
        </Switch>

      </div>
    );
  }
}

export default App;
