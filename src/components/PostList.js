import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import Post from './Post'
import CategoryLinks from './CategoryLinks'
import SortLinks from './SortLinks'

class PostList extends Component {
  componentDidMount() {
    const { match } = this.props

    let currentCategory = match && match.params
      ? match.params.category
      : null

    this.props.changeCategory(currentCategory)
  }

  render() {
    const { posts, comments, currentCategory } = this.props

    let displayPosts = posts && posts
      .filter(post => post.deleted === false)
      .filter(post => currentCategory ? currentCategory === post.category : true)

    return (
      <div className="posts-list">
        <div className="links">
          <CategoryLinks/>
          <SortLinks/>
        </div>

        <div className="posts">
          {(Array.isArray(displayPosts) && displayPosts.length > 0 && (
            <ul>
              {displayPosts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  comments={comments}/>
              ))}
            </ul>
          )) || (
            <h3>No posts found</h3>
          )}
        </div>
      </div>
    )
  }
}

PostList.propTypes = {
}

function mapStateToProps({ categories, posts, comments }) {
  return {
    categories: categories,
    currentCategory: posts.currentCategory,
    currentSortBy: posts.currentSortBy,
    posts: posts.data,
    comments: comments.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg)),
    getAllPosts: () => dispatch(Actions.getAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
