import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import { EditLink, ViewLink } from './Links'
import UserIcon from 'react-icons/lib/fa/user'
import UpIcon from 'react-icons/lib/fa/angle-up'
import DownIcon from 'react-icons/lib/fa/angle-down'
import DeleteIcon from 'react-icons/lib/fa/trash-o'
import { toDateString } from "../utils/helpers";

class Post extends Component {
  handleDeletePost(id) {
    const { error, onDelete } = this.props

    this.props.deletePost(id)
      .then(() => {
        if (error === null || error === undefined) {
          if (onDelete) {
            onDelete(id)
          }
        }
      })
  }

  render() {
    const { post, comments } = this.props

    const commentsCount = comments && comments[post.id] ? comments[post.id].length : 0

    return (
      <li className="post">
        <div className="votes">
          <button
            type="button"
            className="down"
            onClick={() => this.props.upVote(post.id)}>
            <UpIcon size={40}/>
          </button>
          <span className="vote">{post.voteScore}</span>
          <button
            type="button"
            className="up"
            onClick={() => this.props.downVote(post.id)}>
            <DownIcon size={40}/>
          </button>
        </div>

        <div className="post-body">
          <h2><ViewLink id={post.id} label={post.title} /></h2>
          <span>{post.body}</span>
        </div>

        <div className="post-footer">
          <div className="buttons">
            <span className="edit"><EditLink id={post.id}/></span>
            <span className="delete">
              <button
                type="button"
                onClick={() => this.handleDeletePost(post.id)}>
                <DeleteIcon size={16}/>Delete
              </button>
            </span>
          </div>
          <div className="info2">
            <span className="author">
              <UserIcon size={16}/>
              {post.author}
            </span>
            <span className="timestamp">posted on {toDateString(post.timestamp)}</span>
          </div>
          <div className="info1">
            <span className="comments">{commentsCount} comments</span>
            <span className="category">{post.category}</span>
          </div>
        </div>
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (id) => dispatch(Actions.upVote(id)),
    downVote: (id) => dispatch(Actions.downVote(id)),
    deletePost: (id) => dispatch(Actions.deletePost(id))
  }
}

export default connect(null, mapDispatchToProps)(Post)
