import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"

class Comment extends Component {
  render() {
    const { comment } = this.props

    return (
      <div className="comment">
        <p>{comment.body} by {comment.author}</p>
        <p>{comment.voteScore}   {comment.timestampStr}</p>
        <p>
          <button type="button" onClick={() => this.props.upVoteComment(comment.id)}>UP</button>
          <button type="button" onClick={() => this.props.downVoteComment(comment.id)}>DOWN</button>
        </p>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: (id) => dispatch(Actions.upVoteComment(id)),
    downVoteComment: (id) => dispatch(Actions.downVoteComment(id))
  }
}

export default connect(null, mapDispatchToProps)(Comment)
