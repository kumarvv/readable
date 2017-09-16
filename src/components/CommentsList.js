import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Comment from './Comment'

class CommentsList extends Component {
  render() {
    const { comments } = this.props

    return (
      <div>
        <h1>Comments</h1>
        { Array.isArray(comments) && (
          comments.map(comment => (
            <li key={comment.id}>
              <Comment comment={comment}/>
            </li>
          ))
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
