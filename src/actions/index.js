import { randomString } from '../utils/helpers'
import * as API from '../utils/api'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const CHANGE_SORTBY = 'CHANGE_SORTBY'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const onGetCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

export const getCategories = () => dispatch => (
   API
    .getCategories()
    .then(categories => {
      return dispatch(onGetCategories(categories))
    })
)

const onGetAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts
})

export const getAllPosts = () => dispatch => {
  return API
    .getAllPosts()
    .then(posts => {
      dispatch(onGetAllPosts(posts))
      return posts
    })
}

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  currentCategory: category
})

export const changeSortBy = (sortBy) => ({
  type: CHANGE_SORTBY,
  currentSortBy: sortBy
})

function onAddPost(post, result) {
  return {
    type: ADD_POST,
    result,
    post
  }
}

export const addPost = (post) => dispatch => {
  const newPost = {
    ...post,
    id: randomString(20, '#aA'),
    timestamp: Date.now(),
    voterScore: 0,
    deleted: false
  }

  return API
    .addPost(newPost)
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(insertedPost => dispatch(onAddPost(insertedPost)))
    .catch(err => onAddPost(post, err))
}

function onUpdatePost(post, error) {
  return {
    type: UPDATE_POST,
    post,
    error
  }
}

export const updatePost = (post) => dispatch => {
  return API
    .updatePost(post.id, post)
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(updated => dispatch(onUpdatePost(updated)))
    .catch(err => {
      dispatch(onUpdatePost(post, err))
    })
}

function onDeletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export const deletePost = (id) => dispatch => {
  return API
    .deletePost(id)
    .then(resp => {
      dispatch(onDeletePost(id))
    })
}

function onUpVote(post) {
  return {
    type: UP_VOTE,
    post
  }
}

export const upVote = (id) => dispatch => {
  return API
    .addVote(id, 'upVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(post => dispatch(onUpVote(post)))
    .catch(err => onUpVote(null, err))
}

function onDownVote(post) {
  return {
    type: DOWN_VOTE,
    post
  }
}

export const downVote = (id) => dispatch => {
  return API
    .addVote(id, 'downVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(post => dispatch(onDownVote(post)))
    .catch(err => onDownVote(null, err))
}

function onGetComments(postId, comments) {
  return {
    type: GET_COMMENTS,
    postId,
    comments
  }
}

export const getComments = (postId) => dispatch => {
  return API
    .getComments(postId)
    .then(data => {
      dispatch(onGetComments(postId, data))
    })
}


function onUpVoteComment(postId, comment) {
  return {
    type: UP_VOTE_COMMENT,
    postId,
    comment
  }
}

export const upVoteComment = (postId, commentId) => dispatch => {
  return API
    .addCommentVote(commentId, 'upVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(comment => dispatch(onUpVoteComment(postId, comment)))
    .catch(err => onUpVoteComment(null, null, err))
}

function onDownVoteComment(postId, comment) {
  return {
    type: DOWN_VOTE_COMMENT,
    postId,
    comment
  }
}

export const downVoteComment = (postId, commentId) => dispatch => {
  return API
    .addCommentVote(commentId, 'downVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(comment => dispatch(onDownVoteComment(postId, comment)))
    .catch(err => onDownVoteComment(null, null, err))
}

function onAddComment(postId, comment, error) {
  return {
    type: ADD_COMMENT,
    postId,
    comment,
    error: error ? error : null
  }
}

export const addComment = (postId, comment) => dispatch => {
  const newComment = {
    ...comment,
    id: randomString(20, '#aA'),
    parentId: postId,
    timestamp: Date.now(),
    voterScore: 0,
    deleted: false
  }

  return API
    .addComment(newComment)
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(added => dispatch(onAddComment(postId, added)))
    .catch(err => onAddComment(null, null, err))
}

function onUpdateComment(postId, comment, error) {
  return {
    type: UPDATE_COMMENT,
    postId,
    comment,
    error: error ? error : null
  }
}

export const updateComment = (postId, comment) => dispatch => {
  return API
    .updateComment(comment)
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(comment => dispatch(onUpdateComment(postId, comment)))
    .catch(err => onUpdateComment(null, null, err))
}


function onDeleteComment(postId, commentId, error) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId,
    error: error ? error : null
  }
}

export const deleteComment = (postId, commentId) => dispatch => {
  return API
    .deleteComment(commentId)
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(resp => dispatch(onDeleteComment(postId, commentId)))
    .catch(err => onDeleteComment(null, null, err))
}

