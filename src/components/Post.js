import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import { EditLink, ViewLink } from './Links'

class Post extends Component {
  render() {
    const { post } = this.props

    return (
      <li className="post">

        <EditLink id={post.id}/>

        <h2><ViewLink id={post.id} label={post.title} /></h2>
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
        <p>
          <button type="button" onClick={() => this.props.upVote(post.id)}>UP</button>
          <button type="button" onClick={() => this.props.downVote(post.id)}>DOWN</button>
        </p>
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
