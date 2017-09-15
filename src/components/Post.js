import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from "../actions"

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <li className="post">
        <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
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

function mapDispatchToProps(dispatch) {
  return {
    viewPost: (sortBy) => dispatch(Actions.changeSortBy(sortBy))
  }
}

export default connect(null, mapDispatchToProps)(Post)

