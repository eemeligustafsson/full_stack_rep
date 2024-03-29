
import { useState } from 'react'

const Blog = ({ blog, username, updateLikes, deleteBlog }) => {
  const [showAllDetails, setShowAllDetails] = useState(false)

  const toggleShowAllDetails = () => {
    setShowAllDetails(!showAllDetails)
  }

  const increaseLikes = () => {
    const blogUpdated = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    updateLikes(blog.id, blogUpdated)
  }

  const removeBlog = () => {
    //if (window.confirm(`delete blog ${blog.title} ?`)) {
    //deleteBlog(blog.id)
    //}
    deleteBlog(blog.id)
  }

  return (
    <div className="blog">
      {!showAllDetails && (
        <div>
          {blog.title} {blog.author}
          <button id='viewButton' onClick={toggleShowAllDetails}>view</button>
        </div>
      )}
      {showAllDetails && (
        <div className='all-details'>
          <p>
            {blog.title} {<button id='hideButton' onClick={toggleShowAllDetails}>hide</button>}
          </p>
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes} {<button id='likeButton' onClick={increaseLikes}>like</button>}
          </p>
          <p>{blog.author}</p>
          <p>{blog.user.username}</p>
          {blog.user.username === username && (
            <button id='deleteButton' onClick={removeBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
