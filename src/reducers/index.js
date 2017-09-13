import { combineReducers } from 'redux'

import * as Actions from '../actions'

function categories(state = {}, action) {
  switch (action.type) {
    case Actions.RECEIVE_CATEGORIES:
      return action.categories

    default:
      return state
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case Actions.RECEIVE_ALL_POSTS:
      return {
        ...state,
        data: Array.isArray(action.posts)
          ? action.posts.map(post => {
            post.timestampStr = new Date(post.timestamp).toLocaleString()
            return post
          })
          : []
      }

    case Actions.CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
