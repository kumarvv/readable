import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"
import Post from './Post'
import CategoryLinks from './CategoryLinks'
import SortLinks from './SortLinks'
import { CreateLink } from './Links'

class PostList extends Component {
  reloadPosts() {
    this.props.getAllPosts()
  }

  render() {
    const { posts, match } = this.props

    let currentCategory = match && match.params
      ? match.params.category
      : null

    let displayPosts = posts && posts
      .filter(post => !post.deleted)
      .filter(post => currentCategory ? currentCategory === post.category : true)

    return (
      <div>
        <CategoryLinks/>
        <SortLinks/>
        <CreateLink/>

        <button type="button" onClick={() => this.reloadPosts()}>Refresh</button>

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
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg)),
    getAllPosts: () => dispatch(Actions.getAllPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
