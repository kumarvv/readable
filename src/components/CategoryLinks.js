import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class CategoryLinks extends Component {
  changeCategory(catg) {
    this.props.changeCategory(catg)
  }

  render() {
    const { categories, currentCategory } = this.props

    return (
      <div className="category-links">
        <h3>Categories</h3>
        <ul>
          <li className={!currentCategory && ('selected')}>
            <Link
              to="/"
              onClick={() => this.changeCategory(null)}>All
            </Link>
          </li>
          {Array.isArray(categories) && categories.map(catg => (
            <li key={catg.name} className={catg.name === currentCategory && ('selected')}>
              <Link
                to={`/${catg.path}`}
                onClick={() => this.changeCategory(catg.name)}>{catg.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories,
    currentCategory: posts.currentCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryLinks)
