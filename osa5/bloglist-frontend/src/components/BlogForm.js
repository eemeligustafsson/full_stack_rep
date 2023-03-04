import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleNewBlog = (event) => {
    const { name, value } = event.target
    setBlog({ ...blog, [name]: value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title: blog.title, author: blog.author, url: blog.url })
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type="text"
            value={blog.title}
            name="title"
            onChange={handleNewBlog}
          ></input>
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={blog.author}
            name="author"
            onChange={handleNewBlog}
          ></input>
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={blog.url}
            name="url"
            onChange={handleNewBlog}
          ></input>
        </div>
        <button id='createButton' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
