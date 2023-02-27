import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const tempUsername = username;

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogListUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const loginForm = () => (
    <div>
      {message && <Notification message={message}></Notification>}
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const addBlog = async (blogObject) => {
    blogFormref.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const deleteBlog = async (id) => {
    await blogService.remove(id);
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`user ${user.username} successfully logged in`);
    } catch (exception) {
      setMessage(`error ${exception.response.data.error}`);
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
    setMessage("successfully logged out");
  };

  const updateLikes = async (id, updateBlog) => {
    const updatedBlog = await blogService.update(id, updateBlog);
    const newBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(newBlogs);
  };

  const blogFormref = useRef();

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            logged in user: {user.username}{" "}
            <button onClick={handleLogOut}>log out</button>{" "}
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormref}>
            <BlogForm createBlog={addBlog} username={tempUsername} />
          </Togglable>
          <Notification message={message}></Notification>

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
  );
};

export default App;
