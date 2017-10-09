import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import { EditLink, ViewLink } from './Links'
import UserIcon from 'react-icons/lib/fa/user'
import UpIcon from 'react-icons/lib/fa/angle-up'
import DownIcon from 'react-icons/lib/fa/angle-down'

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <li className="post">
        <div className="votes">
          <button
            type="button"
            className="down"
            onClick={() => this.props.upVote(post.id)}>
            <UpIcon size={60}/>
          </button>
          <span className="vote">{post.voteScore}</span>
          <button
            type="button"
            className="up"
            onClick={() => this.props.downVote(post.id)}>
            <DownIcon size={60}/>
          </button>
        </div>

        <div className="post-body">
          <h2><ViewLink id={post.id} label={post.title} /></h2>
          <span>{post.body}</span>
        </div>

        <div className="post-footer">
          <span className="edit"><EditLink id={post.id}/></span>
          <span className="comments">0 comments</span>
          <span className="category">{post.category}</span>
          <span className="author">
            <UserIcon size={16}/>
            {post.author}
          </span>
          <span className="timestamp">posted on {post.timestampStr}</span>
        </div>
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: (id) => dispatch(Actions.upVote(id)),
    downVote: (id) => dispatch(Actions.downVote(id))
  }
}

export default connect(null, mapDispatchToProps)(Post)
