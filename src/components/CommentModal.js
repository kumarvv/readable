import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'
import fillForm from '../utils/form'

class CommentModal extends Component {
  onAfterModalOpen(comment) {
    fillForm(comment)
  }

  onSubmit(e) {
    const { postId, comment } = this.props

    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (this.props.onSubmit) {
      this.props.onSubmit(postId, {
        ...comment,
        ...values
      })
    }
  }

  handleChange(value) {
    this.setState(() => ({
      commentBody: value
    }))
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
