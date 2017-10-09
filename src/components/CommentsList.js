import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Comment from './Comment'
import CommentModal from "./CommentModal";
import AddIcon from 'react-icons/lib/fa/plus-square-o'

class CommentsList extends Component {
  state = {
    modalOpen: false,
    modalComment: {},
    modalMode: 'add'
  }

  openAddModal = () => {
    this.setState(() => ({
      modalOpen: true,
      modalComment: {},
      modalMode: 'add'
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

  onSubmitModal(postId, comment) {
    const { updateComment, addComment } = this.props
    const { modalMode } = this.state

    if (modalMode === 'edit') {
      updateComment(postId, comment)
    } else {
      addComment(postId, comment)
    }

    this.closeModal()
  }

  render() {
    const { post, comments } = this.props
    const { modalComment, modalOpen } = this.state

    const postId = post ? post.id : null
    const postComments = comments ? comments[postId] : []

    return (
      <div className="comments">
        <h2>Comments</h2>
        <button
          type="button"
          className="add-comment"
          onClick={() => this.openAddModal()}>
          <AddIcon size={16}/>Add Comment
        </button>

        <ul>
        { Array.isArray(postComments) && (
          postComments.map(comment => (
            <li key={comment.id}>
              <Comment
                comment={comment}
                onClickEdit={(comment) => this.openEditModal(comment)}/>
            </li>
          ))
        )}
        </ul>

        { modalOpen && (
          <CommentModal
            postId={postId}
            modalOpen={modalOpen}
            comment={modalComment}
            onClose={() => this.closeModal()}
            onSubmit={(postId, comment) => this.onSubmitModal(postId, comment)}
            />
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateComment: (postId, comment) => dispatch(Actions.updateComment(postId, comment)),
    addComment: (postId, comment) => dispatch(Actions.addComment(postId, comment))
  }
}

export default connect(null, mapDispatchToProps)(CommentsList)
