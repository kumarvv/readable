import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PostList from './PostList'
import * as Actions from "../actions"
import CreatePost from './CreatePost'
import ViewPost from './ViewPost'
import EditPost from './EditPost'
import { CreateLink, HomeLink } from "./Links";

class App extends Component {
  componentDidMount() {
    this.props.getCategories()
    this.props.getAllPosts()
      .then(posts => {
        Array.isArray(posts) && (
          posts
            .filter(post => !post.deleted)
            .forEach(post => this.props.getComments(post.id))
        )
      })
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Readable</h1>
          <CreateLink/>
          <HomeLink/>
        </div>

        <div className="content">
          <Route exact path="/" render={() => (
            <PostList/>
          )}/>

          <Route exact path="/posts/create" render={({ history }) => (
            <CreatePost history={history}/>
          )}/>

          <Route exact path="/posts/:postId" render={({ history, match }) => (
            <ViewPost match={match}/>
          )}/>

          <Route exact path="/posts/:postId/edit" render={({ history, match }) => (
            <EditPost match={match} history={history}/>
          )}/>

          <Route exact path="/:category" render={({ match }) => (
            <PostList match={match}/>
          )}/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(Actions.getCategories()),
    getAllPosts: () => dispatch(Actions.getAllPosts()),
    getComments: (postId) => dispatch(Actions.getComments(postId))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
