import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import PostForm from './PostForm'
import { HomeLink } from './Links'

class EditPost extends Component {
  onSubmit = (post) => {
    const { error } = this.props

    if (this.props.updatePost) {
      this.props.updatePost(post)
        .then(() => {
          console.log(error)
          if (error === null || error === undefined) {
            window.history.back()
          }
        })
    }
  }

  render() {
    const { categories, posts, match, error } = this.props

    const postId = match && match.params
      ? match.params.postId
      : null

    const post = postId && Array.isArray(posts)
      ? posts.filter(p => p.id === postId)[0]
      : null

    const categoriesList = Array.isArray(categories) ? categories : []

    return (
      <div className="edit-post">
        <h2>Edit Post</h2>

        {post && (
          <PostForm
            post={post}
            categories={categoriesList}
            onSubmit={(updated) => this.onSubmit(updated)}
            />
        )}

        <div className="error">{error}</div>

      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories: categories,
  posts: posts.data,
  error: posts.error
})

const mapDispatchToProps = (dispatch) => ({
  updatePost: (post) => dispatch(Actions.updatePost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
