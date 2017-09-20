import React, { Component } from 'react'
import Modal from 'react-modal'
import serializeForm from 'form-serialize'

class CommentModal extends Component {
  state = {
    commentBody: ''
  }

  componentDidMount() {
    const { comment } = this.props
    this.setState(() => ({
      commentBody: comment ? comment.body : ''
    }))

    let elm = document.getElementsByName('body')[0]
    if (elm) {
      elm.value = comment ? comment.body : ''
    }
  }

  onSubmit(e) {
    const { postId, comment } = this.props

    const values = serializeForm(e.target, { hash: true })
    const edited = {
      ...comment,
      ...values,
      postId: postId
    }

    if (this.props.onSubmitModal) {
      this.props.onSubmitModal(edited)
    }
  }

  handleChange(value) {
    this.setState(() => ({
      commentBody: value
    }))
  }

  render() {
    const { modalOpen, onClose, comment } = this.props
    const { commentBody } = this.state

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={modalOpen}
        onRequestClose={onClose}
        contentLabel="Modal"
      >
        <form onSubmit={(e) => this.onSubmit(e)}>
          <textarea
            name="body"
            placeholder="Body"
            value={commentBody}
            onChange={(e) => this.handleChange(e.target.value)}
            />
          <button>Save</button>
          <button type="cancel" onClick={onClose}>Cancel</button>
        </form>
      </Modal>
    )
  }
}

export default CommentModal
