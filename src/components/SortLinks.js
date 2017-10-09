import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import CheckIcon from 'react-icons/lib/fa/check'

const SORT_BY_PROPS = [ 'timestamp', 'voteScore' ]

class SortLinks extends Component {
  changeSortBy(catg) {
    this.props.changeSortBy(catg)
  }

  render() {
    return (
      <div className="sort-links">
        <h3>Sort by</h3>
        <ul>
          {SORT_BY_PROPS.map(sortBy => (
            <li
              key={sortBy}
              className={sortBy === this.props.currentSortBy && ('selected')}>
              <button
                type="button"
                onClick={() => this.changeSortBy(sortBy)}>
                {sortBy}
              </button>
              {sortBy === this.props.currentSortBy && (<CheckIcon size={16}/>)}
            </li>
          ))}
        </ul>
      </div>
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
