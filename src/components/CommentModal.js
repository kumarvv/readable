import React, { Component } from 'react'
import Modal from 'react-modal'

class CommentModal extends Component {
  render() {
    const { modalOpen, onCloseModal } = this.props

    return (
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={modalOpen}
        onRequestClose={() => onCloseModal}
        contentLabel="Modal"
      >
        {modalOpen && (
          <div>Comments Form</div>
        )}
        TEST123
      </Modal>
    )
  }
}

export default CommentModal
