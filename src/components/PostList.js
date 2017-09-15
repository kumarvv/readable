import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Actions from "../actions"
import Post from './Post'
import CategoryLinks from './CategoryLinks'
import SortLinks from './SortLinks'

class PostList extends Component {
  componentDidMount() {
    if (this.props.match) {
      let catg = this.props.match.path.substr(1)
      if (catg !== this.props.currentCategory) {
        this.props.changeCategory(catg)
      }
    }
  }

  render() {
    const { posts, currentCategory } = this.props

    let displayPosts = posts && posts
      .filter(post => currentCategory ? currentCategory === post.category : true)
      .filter(post => !post.deleted)

    return (
      <div>
        <CategoryLinks/>
        <SortLinks/>
        <Link to="/create">Create Post</Link>

        <h1>Category={currentCategory}</h1>
        {(Array.isArray(displayPosts) && displayPosts.length > 0 && (
          <ul className="posts">
            {displayPosts.map((post) => (
              <Post key={post.id} post={post}/>
            ))}
          </ul>
        )) || (
          <h3>No posts found</h3>
        )}

      </div>
    )
  }
}

PostList.propTypes = {
}

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories,
    currentCategory: posts.currentCategory,
    currentSortBy: posts.currentSortBy,
    posts: posts.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
