import randomString from '../utils/helpers'
import * as API from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const GET_POST = 'GET_POST'
export const UP_VOTE = 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
   API
    .fetchCategories()
    .then(categories => {
      return dispatch(receiveCategories(categories))
    })
)

export const receiveAllPosts = (posts) => ({
  type: RECEIVE_ALL_POSTS,
  posts
})

export const fetchAllPosts = () => dispatch => {
  API
    .fetchAllPosts()
    .then(posts => dispatch(receiveAllPosts(posts)))
}

export function changeCategory(category) {
  return {
    type: CHANGE_CATEGORY,
    currentCategory: category
  }
}

export function addPost({ post }) {
  return {
    type: ADD_POST,
    post: { ...post, id: randomString('#aA') }
  }
}

export function getPost({ id }) {
  return {
    type: GET_POST,
    id
  }
}

export function upVote({ id }) {
  return {
    type: UP_VOTE,
    id,
    option: 'upVote'
  }
}

export function downVote({ id }) {
  return {
    type: DOWN_VOTE,
    id,
    option: 'downVote'
  }
}

export function updatePost({ id, post }) {
  return {
    type: UPDATE_POST,
    id,
    post
  }
}

export function deletePost({ id }) {
  return {
    type: DELETE_POST,
    id
  }
}
