import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const SORT_BY_PROPS = [ 'timestamp', 'voteScore' ]

class SortLinks extends Component {
  changeSortBy(catg) {
    this.props.changeSortBy(catg)
  }

  render() {
    return (
      <ul className="sort-by-props">
        {SORT_BY_PROPS.map(sortBy => (
          <li key={sortBy}>
            <button type="button" onClick={() => this.changeSortBy(sortBy)}>{sortBy}</button>
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories,
    currentSortBy: posts.currentCategory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSortBy: (catg) => dispatch(Actions.changeSortBy(catg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortLinks)
