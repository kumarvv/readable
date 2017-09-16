import randomString from '../utils/helpers'
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

const okGetCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories
})

export const getCategories = () => dispatch => (
   API
    .getCategories()
    .then(categories => {
      return dispatch(okGetCategories(categories))
    })
)

const okGetAllPosts = (posts) => ({
  type: GET_ALL_POSTS,
  posts
})

export const getAllPosts = () => dispatch => {
  API
    .getAllPosts()
    .then(posts => dispatch(okGetAllPosts(posts)))
}

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  currentCategory: category
})

export const changeSortBy = (sortBy) => ({
  type: CHANGE_SORTBY,
  currentSortBy: sortBy
})

function okAddPost(post, result) {
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
    .then(insertedPost => dispatch(okAddPost(insertedPost)))
    .catch(err => okAddPost(post, err))
}

function okUpdatePost(post, error) {
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
    .then(updated => dispatch(okUpdatePost(updated)))
    .catch(err => {
      dispatch(okUpdatePost(post, err))
    })
}

function okDeletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export const deletePost = (id) => dispatch => {
  return API
    .deletePost(id)
    .then(deletedPost => {
      dispatch(okDeletePost(deletedPost))
    })
}

function okUpVote(post) {
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
    .then(post => dispatch(okUpVote(post)))
    .catch(err => okUpVote(null, err))
}

function okDownVote(post) {
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
    .then(post => dispatch(okDownVote(post)))
    .catch(err => okDownVote(null, err))
}

function okGetComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const getComments = (postId) => dispatch => {
  return API
    .getComments(postId)
    .then(data => {
      dispatch(okGetComments(data))
    })
}


function okUpVoteComment(comment) {
  return {
    type: UP_VOTE_COMMENT,
    comment
  }
}

export const upVoteComment = (id) => dispatch => {
  return API
    .addCommentVote(id, 'upVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(comment => dispatch(okUpVoteComment(comment)))
    .catch(err => okUpVoteComment(null, err))
}

function okDownVoteComment(comment) {
  return {
    type: DOWN_VOTE_COMMENT,
    comment
  }
}

export const downVoteComment = (id) => dispatch => {
  return API
    .addCommentVote(id, 'downVote')
    .then(resp => handleErrors(resp))
    .then(resp => resp.json())
    .then(comment => dispatch(okDownVoteComment(comment)))
    .catch(err => okDownVoteComment(null, err))
}
