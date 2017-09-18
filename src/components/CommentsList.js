import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as Actions from '../actions'
import Comment from './Comment'
import CommentModal from "./CommentModal";

class CommentsList extends Component {
  state = {
    modalOpen: false,
    modalComment: {}
  }

  openAddModal = () => {
    this.setSate(() => ({
      modalOpen: true,
      modalComment: {}
    }))
  }

  onSaveAddModal = () => {

  }

  render() {
    const { postId, comments } = this.props
    const { modalOpen, modalComment } = this.state

    const postComments = comments ? comments[postId] : []

    return (
      <div>
        <h1>Comments</h1>
        <ul>
        { Array.isArray(postComments) && (
          postComments.map(comment => (
            <li key={comment.id}>
              <Comment comment={comment}/>
            </li>
          ))
        )}
        </ul>
        <button type="button" onClick={() => this.openAddModal}>Add Comment</button>
        
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={modalOpen}
          contentLabel="Modal"
        >
          {modalOpen && (
            <div>Comments Form</div>
          )}
          TEST123
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList)
