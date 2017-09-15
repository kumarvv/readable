import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import PostList from './PostList'
import * as Actions from "../actions"
import CreatePost from './CreatePost'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchAllPosts()
  }

  render() {
    const { categories } = this.props

    return (
      <div className="container">
        <h1 className="header">Readable</h1>

        <Route exact path="/" render={() => (
          <PostList/>
        )}/>

        <Route path="/create" render={() => (
          <CreatePost/>
        )}/>

        {Array.isArray(categories) && categories.map(catg => (
          <Route key={catg.name} path={`/${catg.path}`} render={({ match }) => (
            <PostList match={match}/>
          )}/>
        ))}

      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories: categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategories: () => dispatch(Actions.fetchCategories()),
    fetchAllPosts: () => dispatch(Actions.fetchAllPosts()),
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg)),
    changeSortBy: (sortBy) => dispatch(Actions.changeSortBy(sortBy)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

