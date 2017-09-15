import { combineReducers } from 'redux'
import sortBy from 'sort-by'
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
      let currentSortBy = state.currentSortBy ? state.currentSortBy : 'voteScore'

      return {
        ...state,
        currentSortBy: currentSortBy,
        data: Array.isArray(action.posts)
          ? action.posts.map(post => {
            post.timestampStr = new Date(post.timestamp).toLocaleString()
            return post
          }).sort(sortBy('-'+currentSortBy))
          : []
      }

    case Actions.CHANGE_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      }

    case Actions.CHANGE_SORTBY:
      return {
        ...state,
        data: state.data ? state.data.sort(sortBy('-'+action.currentSortBy)) : [],
        currentSortBy: action.currentSortBy
      }

    case Actions.ADD_POST:
      return {
        ...state,
        data: (Array.isArray(state.data)
          ? state.data.concat(action.post)
          : [action.post]).sort(state.currentSortBy)
      }

    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts
})
