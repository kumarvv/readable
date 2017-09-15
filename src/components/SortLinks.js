import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

const SORT_BY_PROPS = [ 'timestamp', 'voteScore' ]

class SortLinks extends Component {
  changeSortBy(catg) {
    this.props.changeSortBy(catg)
  }

  render() {
    const { currentSortBy } = this.props

    return (
      <ul className="sort-by-props">
        {SORT_BY_PROPS.map(sortBy => (
          <li key={sortBy}>
            <button type="button" onClick={() => this.changeSortBy(sortBy)}>{sortBy}</button>
            {sortBy === currentSortBy && (<span>*</span>)}
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    currentSortBy: posts.currentSortBy
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeSortBy: (sortBy) => dispatch(Actions.changeSortBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortLinks)
