const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => (
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)
)

export const getCategoryPosts = (category) => (
  fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
    .then(data => data.posts)
)

export const getAllPosts = () => (
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())
    .then(data => data)
)

export const addPost = (post) => {
  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
}

export const getPost = (id) => {
  return fetch(`${api}/posts/${id}`, {headers})
    .then(res => res.json())
    .then(data => data.post)
}

export const addVote = (id, vote) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: vote
    })
  })
}

export const updatePost = (id, post) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
}

export const deletePost = (id) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
}

export const getComments = (postId) => {
  return fetch(`${api}/posts/${postId}/comments`,
    {headers})
    .then(res => res.json())
}

export const getComment = (id) => {
  return fetch(`${api}/comments/${id}`, {headers})
    .then(res => res.json())
    .then(data => data.comment)
}

export const addComment = (comment) => {
  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
}

export const updateComment = (comment) => {
  return fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
}

export const deleteComment = (id) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
}

export const addCommentVote = (id, vote) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: vote
    })
  })
}
