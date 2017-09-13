import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "../actions"

class PostList extends Component {
  componentDidMount() {
    if (this.props.match && this.props.setCurrentCategory) {
      this.props.setCurrentCategory(this.props.match.params.category)
    }
  }

  render() {
    const { posts, currentCategory } = this.props

    if (!posts || posts.length === 0) {
      return <p>No posts found</p>
    }

    let displayPosts = posts
      .filter(post => currentCategory ? currentCategory === post.category : true)
      .filter(post => !post.deleted)

    return (
      <div>
        <h1>Category={currentCategory}</h1>
        <ul className="posts">
          {displayPosts.map((post) => (
            <li key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>
                <span className="author">{post.author}</span> posted on
                <span className="timestamp">{post.timestampStr}</span>
                <span className="comments">0 comments</span>
              </p>
              <p>{post.body}</p>
              <p>
                <span className="category">{post.category}</span>
                <span className="vote">{post.voteScore}</span>
              </p>
            </li>
          ))}
        </ul>
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
    posts: posts.data
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeCategory: (catg) => dispatch(Actions.changeCategory(catg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
