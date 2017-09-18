import { combineReducers } from 'redux'
import sortBy from 'sort-by'
import * as Actions from '../actions'

function categories(state = {}, action) {
  switch (action.type) {
    case Actions.GET_CATEGORIES:
      return action.categories

    default:
      return state
  }
}

function sortByDesc(key) {
  return sortBy('-' + key)
}

function posts(state = {}, action) {
  let currentSortBy = state.currentSortBy ? state.currentSortBy : 'voteScore'

  switch (action.type) {
    case Actions.GET_ALL_POSTS:
      return {
        ...state,
        currentSortBy: currentSortBy,
        data: Array.isArray(action.posts)
          ? action.posts.map(post => {
            post.timestampStr = new Date(post.timestamp).toLocaleString()
            return post
          }).sort(sortByDesc(currentSortBy))
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
        data: state.data
          ? state.data.sort(sortByDesc(currentSortBy))
          : [],
        currentSortBy: action.currentSortBy
      }

    case Actions.ADD_POST:
      return {
        ...state,
        data: (Array.isArray(state.data)
          ? state.data.concat(action.post)
          : [action.post]
          ).sort(sortByDesc(currentSortBy))
      }

    case Actions.UPDATE_POST:
    case Actions.DELETE_POST:
    case Actions.UP_VOTE:
    case Actions.DOWN_VOTE:
      return {
        ...state,
        data: (Array.isArray(state.data)
          ? state.data.map(p => action.post && p.id === action.post.id
            ? action.post
            : p)
            : [action.post]
          ).sort(sortByDesc(currentSortBy)),
        error: action.error ? action.error.message : null
      }

    default:
      return state
  }
}

function comments(state = {}, action) {
  switch(action.type) {
    case Actions.GET_COMMENTS:
      return {
        ...state,
        data: {
          ...state.data,
          [action.postId]: Array.isArray(action.comments)
            ? action.comments.map(comment => {
              comment.timestampStr = new Date(comment.timestamp).toLocaleString()
              return comment
            }).sort(sortByDesc('voteScore'))
            : []
        }
      }

    case Actions.ADD_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.postId]: state.data
            ? state.data.concat(action.comment)
            : [action.comment]
        }
      }

    case Actions.UPDATE_COMMENT:
    case Actions.DELETE_COMMENT:
    case Actions.UP_VOTE_COMMENT:
    case Actions.DOWN_VOTE_COMMENT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.postId]: (Array.isArray(state.data)
            ? state.data.map(c => action.comment && c.id === action.comment.id
              ? action.comment
              : c)
            : [action.comment]
          ).sort(sortByDesc('voteScore'))
        },
        error: action.error ? action.error.message : null
      }

    default:
      return state
  }

}

export default combineReducers({
  categories,
  posts,
  comments
})
