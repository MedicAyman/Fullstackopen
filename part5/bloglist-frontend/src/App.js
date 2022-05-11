// TODO add compoenent rerender when a blog is deleted
import { BlogForm } from './components/BlogForm'
import { LoginForm } from './components/LoginForm'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        message: 'logged in',
        type: 'success',
      })

      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        })
      }, 5000)
    } catch (exception) {
      setNotification({
        message: 'wrong credentials',
        type: 'error',
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        })
      }, 5000)
    }
  }

  const handleCreateBlog = async (newObject) => {
    try {
      const blog = await blogService.create(newObject)
      blogFormRef.current.toggleVisibility()
      setNotification({
        message: 'created successfully',
        type: 'success',
      })
      setBlogs(blogs.concat(blog))
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        })
      }, 5000)
    } catch (exception) {
      setNotification({
        message: 'an errror occured',
        type: 'error',
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        })
      }, 5000)
    }
  }
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsList = await blogService.getAll()

        setBlogs(blogsList)
      } catch (error) {
        setNotification({ message: error, type: 'error' })
      }
    }
    getBlogs()
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      ) : (
        <Togglable buttonLabel="Create a blog" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
