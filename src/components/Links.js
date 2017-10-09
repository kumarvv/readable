import React from 'react'
import { Link } from 'react-router-dom'
import EditIcon from 'react-icons/lib/fa/edit'
import AddIcon from 'react-icons/lib/fa/plus-square-o'
import HomeIcon from 'react-icons/lib/fa/home'

export const EditLink = ({ id, label }) => (
  <Link to={`/posts/edit/${id}`} className="edit-link">
    <EditIcon size={16}/>{label ? label : 'edit'}
  </Link>
)

export const ViewLink = ({ id, label }) => (
  <Link to={`/posts/view/${id}`} className="view-link">
    {label ? label : 'View'}
  </Link>
)

export const CreateLink = ({ label }) => (
  <Link to="/posts/create" className="add-link">
    <AddIcon size={20}/>{label ? label : 'Add a Post'}
  </Link>
)

export const HomeLink = ({ label }) => (
  <Link to="/" className="home-link">
    <HomeIcon size={20}/>{label ? label : 'Home'}
  </Link>
)
