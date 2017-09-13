import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import PostList from './PostList'
import * as Actions from "../actions"

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchAllPosts()
  }

  selectCategory(catg) {
    this.props.changeCategory(catg)
  }

  render() {
    const { categories, currentCategory } = this.props

    return (
      <div className="container">
        <h1 className="header">Readable</h1>

        {Array.isArray(categories) && (
          <ul className="categories">
            {categories.map(catg => (
              <li key={catg.name}>
                <Link to={`/${catg.path}`} onClick={() => this.selectCategory(catg.name)}>{catg.name}</Link>
              </li>
            ))}
          </ul>
        )}
        <Link to="/" onClick={() => this.selectCategory(null)}>Home</Link>

        <Route exact path="/" component={PostList}/>
        <Route path="/:category" component={PostList}/>

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

