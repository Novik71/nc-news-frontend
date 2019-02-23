import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import icon from './images/icon-large.png';
import TopicPage from './components/TopicPage';
import Home from './components/Home';
import ArticleView from './components/ArticleView';
import LoginControl from './components/LoginControl';
import TopicNav from './components/TopicNav';
import ArticleAdd from './components/ArticleAdd';

class App extends Component {

  state = {
    loggedInUser: null
  }

  render() {
    return (
      <div className="App">
        <div className="app_head_grid">
          <img className="icon" src={icon} alt="icon" />
          <LoginControl logInUser={this.logInUser} loggedInUser={this.state.loggedInUser} />
          <div className="app_head_inner_grid" fontStyle="italic"><h1><Link to='/'>NC News</Link></h1>
            <TopicNav />
          </div>
        </div>
        <br />
        <div className="app_body">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/topics/:topic' render={({ match }) => <TopicPage match={match} />} />
            <Route exact path='/topics/:topic_id/articles/new' render={({ match }) => <ArticleAdd loggedInUser={this.state.loggedInUser} match={match} />} />
            <Route path='/articles/:article_id' render={({ match }) => <ArticleView match={match} loggedInUser={this.state.loggedInUser} />} />
            <Route path='/error' />
          </Switch>
        </div>

      </div>
    );
  }

  logInUser = (user) => {
    this.setState({
      loggedInUser: user
    })
  }

}

export default App;
