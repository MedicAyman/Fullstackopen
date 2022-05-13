import React, { useEffect, useState } from 'react'
import blogServices from '../services/blog'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLikes(blog.likes)
    setUser(JSON.parse(window.localStorage.getItem('loggedBlogappUser')))
  }, [blog.likes])
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = () => {
    setLikes((+likes + 1).toString())
    blogServices.update({
      ...blog,
      likes: likes,
    })
  }

  const deleteBlog = async () => {
    try {
      if (window.confirm('Are you sure you wanna delte this post?')) {
        blogServices.remove(blog, user.token)
      }
    } catch (error) {
      console.log('could not delete it', error)
    }
  }
  let deleteBtn
  if (user) {
    if (user.name === blog.author) {
      deleteBtn = <button onClick={deleteBlog}>delete</button>
    } else {
      deleteBtn = ''
    }
  }

  return (
    <div style={blogStyle} className="">
      <div style={hideWhenVisible} className="minimalBlog">
        {blog.title}-by {blog.author}
        <button onClick={toggleVisibility} className="view-button">View Blog</button>{' '}
        {deleteBtn}
        <button onClick={addLike} className="likeButton">Like!</button>
      </div>
      <div style={showWhenVisible} className='blog-details'>
        <p></p>
        <p className='blog-author'>Author: {blog.author} </p>
        <p className='blog-url'>Url: {blog.url}</p>
        <p className='blog-likes'>Likes: {likes}</p>
        <p>
          <button onClick={addLike}>Like</button>
        </p>
        <p>{deleteBtn}</p>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
}

export default Blog
