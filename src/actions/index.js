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
  API
    .deletePost(id)
    .then(deletedPost => {
      dispatch(okDeletePost(deletedPost))
    })
}

export function okUpVote(post) {
  return {
    type: UP_VOTE,
    post
  }
}

export const upVote = (id) => dispatch => {
  API
    .addVote(id, 'upVote')
    .then(post => {
      dispatch(okUpVote(post))
    })
}


export function okDownVote({ id }) {
  return {
    type: DOWN_VOTE,
    id,
    option: 'downVote'
  }
}

export const downVote = (id) => dispatch => {
  API
    .addVote(id, 'downVote')
    .then(post => {
      dispatch(okDownVote(post))
    })
}
