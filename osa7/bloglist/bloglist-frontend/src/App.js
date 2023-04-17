import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'
//2
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = async (blogObject) => {
    blogFormref.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setMessage(`user ${user.username} successfully logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage(`error ${exception.response.data.error}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
    setMessage('successfully logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateLikes = async (id, updateBlog) => {
    const updatedBlog = await blogService.update(id, updateBlog)
    const newBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )
    setBlogs(newBlogs)
  }

  const blogFormref = useRef()

  return (
    <div>
      <Notification message={message}></Notification> 
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            logged in user: {user.username}{' '}
            <button id='logoutButton' onClick={handleLogOut}>log out</button>{' '}
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormref}>
            <BlogForm createBlog={addBlog} username={username} />
          </Togglable>
          

          {blogs
            .sort((x, y) => y.likes - x.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
                updateLikes={updateLikes}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
