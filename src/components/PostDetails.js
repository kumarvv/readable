import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from '../actions'
import CommentsList from './CommentsList'

class PostDetails extends Component {
  render() {
    const { posts, match, mode } = this.props

    const postId = match && match.params
      ? match.params.postId
      : null

    const post = postId && Array.isArray(posts)
      ? posts.filter(p => p.id === postId)[0]
      : null

    return (
      <div>
        <h1>{mode} Details</h1>
        <Link to="/">Home</Link>
        {(post && (
          <div>
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
            <CommentsList post={post}/>
          </div>
        )) || (
          <p>Post not found</p>
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
    viewPost: (sortBy) => dispatch(Actions.changeSortBy(sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)


