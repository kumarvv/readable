import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import fillForm from '../utils/form'

class PostForm extends Component {
  state = {
    errors: []
  }

  componentDidMount() {
    fillForm(this.props.post)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const values = serializeForm(e.target, { hash: true })

    if (this.validate(values)) {
      if (this.props.onSubmit) {
        this.props.onSubmit({
          ...this.props.post,
          ...values
        })
      }
    }
  }

  validate(values) {
    let errors = []

    if (!values) {
      errors.push('invalid form data')
    } else {
      if (!values.title || values.title === '') {
        errors.push("post title is required")
      }
      if (!values.body || values.body === '') {
        errors.push("post body is required")
      }
      if (!values.author || values.author === '') {
        errors.push("post author is required")
      }
    }

    this.setState(() => ({
      errors: errors
    }))

    return errors.length === 0
  }

  render() {
    const { categories } = this.props

    return (
      <form className="post-form"
            onSubmit={(e) => this.handleSubmit(e)}>
        <div className="post-content">
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
                  <option
                    key={catg.name}
                    value={catg.name}>
                    {catg.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {this.state.errors.length > 0 && (
            <div className="error">
              {this.state.errors.map((error, i) => (<p key={`error_${i}`}>{error}</p>))}
            </div>
          )}
          <div className="post-footer">
            <button className="primary">Save</button>
            <Link to="/" className="cancel">Cancel</Link>
          </div>
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
