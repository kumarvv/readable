import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"

class CommentsList extends Component {
  render() {
    const { post } = this.props

    return (
      <div>
        <h1>Comments</h1>
        { post && post.comments && (
          post.comments.map(comment => (
            <li>
              {comment.body} by {comment.author}
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
