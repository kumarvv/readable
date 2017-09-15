const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const fetchCategories = () => (
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)
)

export const fetchCategoryPosts = (category) => (
  fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
    .then(data => data.posts)
)

export const fetchAllPosts = () => (
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
    .then(res => res.json())
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
    .then(res => res.json())
    .then(data => data.post)
}

export const updatePost = (id, post) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: post.title,
      body: post.body
    })
  })
    .then(res => res.json())
    .then(data => data.post)
}

export const deletePost = (id, post) => {
  return fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => data.post)
}

export const fetchPostComments = (id) => {
  return fetch(`${api}/posts/${id}/comments`, {headers})
    .then(res => res.json())
    .then(data => data.comments)
}

export const fetchComment = (id) => {
  return fetch(`${api}/comments/${id}`, {headers})
    .then(res => res.json())
    .then(data => data.comments)
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
    .then(res => res.json())
    .then(data => data.comment)
}

export const updateComment = (id, comment) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data.comment)
}

export const deleteComment = (id, comment) => {
  return fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(res => res.json())
    .then(data => data.comment)
}
