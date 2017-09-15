import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import * as Actions from "../actions"

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <li className="post">
        <h3>{post.title}</h3>
        <p>
          <span className="author">{post.author}</span> posted on
          <span className="timestamp">{post.timestampStr}</span>
          <span className="comments">0 comments</span>
        </p>
        <p>{post.body}</p>
        <p>
          <span className="category">{post.category}</span>
          <span className="vote">{post.voteScore}</span>
        </p>
      </li>
    )
  }
}

export default Post


