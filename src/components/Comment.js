import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import UserIcon from 'react-icons/lib/fa/user'
import UpIcon from 'react-icons/lib/fa/angle-up'
import DownIcon from 'react-icons/lib/fa/angle-down'

class Comment extends Component {
  handleOnClickEdit(comment) {
    if (this.props.onClickEdit) {
      this.props.onClickEdit(comment)
    }
  }

  render() {
    const { comment } = this.props

    return (
      <div className="comment">
        <div className="votes">
          <button
            type="button"
            className="down"
            onClick={() => this.props.upVoteComment(comment.parentId, comment.id)}>
            <UpIcon size={20}/>
          </button>
          <span className="vote">{comment.voteScore}</span>
          <button
            type="button"
            className="up"
            onClick={() => this.props.downVoteComment(comment.parentId, comment.id)}>
            <DownIcon size={20}/>
          </button>
        </div>

        <div className="comment-body">
          <p>{comment.body} by {comment.author}</p>
        </div>

        <div className="comment-footer">
          <button
            type="button"
            onClick={() => this.handleOnClickEdit(comment)}>
            Edit
          </button>
          <button
            type="button"
            onClick={() => this.props.deleteComment(comment.parentId, comment.id)}>
            Delete
          </button>
          <span className="author">
            <UserIcon size={16}/>
            {comment.author}
          </span>
          <span className="timestamp">posted on {comment.timestampStr}</span>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVoteComment: (postId, commentId) => dispatch(Actions.upVoteComment(postId, commentId)),
    downVoteComment: (postId, commentId) => dispatch(Actions.downVoteComment(postId, commentId)),
    deleteComment: (postId, commentId) => dispatch(Actions.deleteComment(postId, commentId))
  }
}

export default connect(null, mapDispatchToProps)(Comment)
