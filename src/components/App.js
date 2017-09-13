import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import PostList from './PostList'
import * as Actions from "../actions"

const SORT_BY_PROPS = [ 'timestamp', 'voteScore' ]

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchAllPosts()
  }

  changeCategory(e, catg) {
    e.preventDefault()
    this.props.changeCategory(catg)
  }

  changeSortBy(sortBy) {
    this.props.changeSortBy(sortBy)
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
                <Link to={`/${catg.path}`} onClick={(e) => this.changeCategory(e, catg.name)}>{catg.name}</Link>
              </li>
            ))}
            <li key="home">
              <Link to="/" onClick={() => this.selectCategory(null)}>Home</Link>
            </li>
          </ul>
        )}

        <ul className="sort-by-props">
          {SORT_BY_PROPS.map(sortBy => (
            <li key={sortBy}>
              <a href="#" onClick={() => this.changeSortBy(sortBy)}>{sortBy}</a>
            </li>
          ))}
        </ul>

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
    changeSortBy: (sortBy) => dispatch(Actions.changeSortBy(sortBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

