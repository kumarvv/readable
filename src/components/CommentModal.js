import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import fillForm from '../utils/form'

class CommentModal extends Component {
  state = {
    errors: []
  }

  onAfterModalOpen(comment) {
    fillForm(comment)
  }

  onSubmit(e) {
    const { postId, comment } = this.props

    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (this.validate(values)) {
      if (this.props.onSubmit) {
        this.props.onSubmit(postId, {
          ...comment,
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
      if (!values.body || values.body === '') {
        errors.push("comment body is required")
      }
      if (!values.author || values.author === '') {
        errors.push("comment author is required")
      }
    }

    this.setState(() => ({
      errors: errors
    }))

    return errors.length === 0
  }

  render() {
    const { modalOpen, onClose, comment } = this.props

    return (
      <Modal
        className="comments-modal"
        overlayClassName="overlay"
        isOpen={modalOpen}
        onRequestClose={onClose}
        onAfterOpen={(e) => this.onAfterModalOpen(comment)}
        contentLabel="Modal"
      >
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="modal-body">
            <textarea
              name="body"
              placeholder="Body"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
            />
          </div>

          {this.state.errors.length > 0 && (
            <div className="error">
              {this.state.errors.map((error, i) => (<p key={`error_${i}`}>{error}</p>))}
            </div>
          )}

          <div className="modal-footer">
            <button
              type="submit"
              className="primary">
              Save
            </button>
            <button
              type="cancel"
              className="cancel"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

CommentModal.propTypes = {
  comment: PropTypes.object.isRequired,
  onSubmit: PropTypes.func
}

export default CommentModal
