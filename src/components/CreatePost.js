import React, { Component } from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import * as Actions from "../actions"

class CreatePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })
    if (this.props.addPost) {
      this.props.addPost(values)
    }
  }

  render() {
    return (
      <div>
        <h1>Create Post</h1>
        <Link to="/">Home</Link>

        <form className="create-form"
              onSubmit={(e) => this.handleSubmit(e)}>
          <div className="create-contact-details">
            <div className="field-group">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" placeholder="Title"/>
            </div>
            <div className="field-group">
              <label htmlFor="title">Body</label>
              <textarea name="body" placeholder="Body"/>
            </div>
            <div className="field-group">
              <label htmlFor="title">Author</label>
              <input type="text" name="author" placeholder="Author"/>
            </div>
            <div className="field-group">
              <label htmlFor="title">Category</label>
              <select name="category" placeholder="Category">
              </select>
            </div>
            <button>Create Post</button>
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }

  renderX() {
    // const { categories } = this.props

    // const categoryList = categories ? categories : []

    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories: categories,
  currentCategory: posts.currentCategory
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(Actions.addPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
