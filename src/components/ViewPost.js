import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import CommentsList from './CommentsList'
import Post from './Post'

class ViewPost extends Component {
  componentDidMount() {
    const { match } = this.props

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
      <div className="view-post">
        {(post && (
          <div>
            <Post post={post} comments={comments}/>
            <CommentsList post={post} comments={comments}/>
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
  comments: comments ? comments.data : {}
})

const mapDispatchToProps = (dispatch) => ({
  getComments: (postId) => dispatch(Actions.getComments(postId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost)
