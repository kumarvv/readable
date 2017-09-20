import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as Actions from '../actions'
import Comment from './Comment'
import CommentModal from "./CommentModal";

class CommentsList extends Component {
  state = {
    modalOpen: false,
    modalComment: {},
    modalMode: 'create'
  }

  openAddModal = () => {
    this.setState(() => ({
      modalOpen: true,
      modalComment: {},
      modalMode: 'create'
    }))
  }

  openEditModal = (comment) => {
    this.setState(() => ({
      modalOpen: true,
      modalComment: comment,
      modalMode: 'edit'
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      modalOpen: false
    }))
  }


  onSubmitModal(comment) {
    const { updateComment, addComment } = this.props
    const { mode } = this.state

    if (mode === 'edit') {
      updateComment(comment)
    } else {
      addComment(comment)
    }

    this.closeModal()
  }

  render() {
    const { postId, comments } = this.props
    const { modalMode, modalComment, modalOpen } = this.state

    const postComments = comments ? comments[postId] : []

    return (
      <div>
        <h1>Comments</h1>
        <ul>
        { Array.isArray(postComments) && (
          postComments.map(comment => (
            <li key={comment.id}>
              <Comment comment={comment}/>
              <button
                type="button"
                onClick={() => this.openEditModal(comment)}>Edit</button>
            </li>
          ))
        )}
        </ul>

        <button
          type="button"
          onClick={() => this.openAddModal()}>
          Add Comment
        </button>

        { modalOpen && (
          <CommentModal
            postId={postId}
            modalOpen={modalOpen}
            comment={modalComment}
            mode={modalMode}
            onClose={() => this.closeModal()}
            onSubmit={(comment) => this.onSubmitModal(comment)}
            />
        )}
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.data
  }
}

export default connect(mapStateToProps, null)(CommentsList)
