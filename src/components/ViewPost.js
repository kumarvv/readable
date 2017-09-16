import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from "../actions"
import CommentsList from './CommentsList'
import { EditLink } from './Links'

class ViewPost extends Component {
  componentDidMount() {
    const { posts, comments, match } = this.props

    const postId = match && match.params
      ? match.params.postId
      : null

    if (postId) {
      this.props.getComments(postId)
    }
  }

  render() {
    const { posts, comments, match } = this.props

    const postId = match && match.params
      ? match.params.postId
      : null

    const post = postId && Array.isArray(posts)
      ? posts.filter(p => p.id === postId)[0]
      : null

    return (
      <div>
        <h1>View Post</h1>
        <Link to="/">Home</Link>
        {(post && (
          <div>
            <EditLink id={post.id}/>

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
            <CommentsList comments={comments}/>
          </div>
        )) || (
          <p>Post not found</p>
        )}
      </div>
    )
  }
}
const mapStateToProps = ({ categories, posts, comments }) => ({
  categories: categories,
  posts: posts.data,
  comments: comments ? comments.data : []
})

const mapDispatchToProps = (dispatch) => ({
  getComments: (postId) => dispatch(Actions.getComments(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
