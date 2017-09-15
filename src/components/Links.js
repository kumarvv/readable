import React from 'react'
import { Link } from 'react-router-dom'

export const EditLink = ({ id, label }) => (
  <Link to={`/posts/edit/${id}`}>{label ? label : 'Edit'}</Link>
)

export const ViewLink = ({ id, label }) => (
  <Link to={`/posts/view/${id}`}>{label ? label : 'View'}</Link>
)

export const CreateLink = ({ label }) => (
  <Link to="/posts/create">{label ? label : 'Add a Post'}</Link>
)

export const HomeLink = ({ label }) => (
  <Link to="/">{label ? label : 'Home'}</Link>
)
