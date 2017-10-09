import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import PostForm from './PostForm'

class CreatePost extends Component {
  onSubmit = (post) => {
    const { error } = this.props

    if (this.props.addPost) {
      this.props.addPost(post)
        .then(() => {
          (error === null || error === undefined) && (window.history.back())
        })
    }
  }

  render() {
    const { categories, error } = this.props

    return (
      <div>
        <h1>Add a Post</h1>

        <PostForm
          post={{}}
          categories={Array.isArray(categories) ? categories : []}
          onSubmit={(inserted) => this.onSubmit(inserted)}
          />

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
  addPost: (post) => dispatch(Actions.addPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
