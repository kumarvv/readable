import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import fillForm from '../utils/form'

class PostForm extends Component {
  componentDidMount() {
    fillForm(this.props.post)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })
    if (this.props.onSubmit) {
      this.props.onSubmit({
        ...this.props.post,
        ...values
      })
    }
  }

  render() {
    const { categories } = this.props

    return (
      <form className="post-form"
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
              {Array.isArray(categories) && (
                categories.map((catg) => (
                  <option key={catg.name} value={catg.name}>{catg.name}</option>
                ))
              )}
            </select>
          </div>
          <button>Save</button>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    )
  }
}

PostForm.propTypes = {
  post: PropTypes.object,
  categories: PropTypes.array,
  onSubmit: PropTypes.func
}

export default PostForm
