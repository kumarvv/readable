import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PostList from './PostList'
import * as Actions from "../actions"
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'
import EditPost from './EditPost'

class App extends Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getAllPosts()
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1 className="header">Readable</h1>
        </div>

        <div className="data">
          <Route exact path="/" render={() => (
            <PostList/>
          )}/>
          <Route exact path="/posts/create" render={({ history }) => (
            <CreatePost history={history}/>
          )}/>
          <Route exact path="/posts/view/:postId" render={({ history, match }) => (
            <ViewPost match={match}/>
          )}/>
          <Route path="/posts/edit/:postId" render={({ history, match }) => (
            <EditPost match={match} history={history}/>
          )}/>

          <Route exact path="/:category" render={({ match }) => (
            <PostList match={match}/>
          )}/>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(Actions.getCategories()),
    getAllPosts: () => dispatch(Actions.getAllPosts())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
