import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blog";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        message: "logged in",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
    } catch (exception) {
      setNotification({
        message: "wrong credentials",
        type: "error",
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
    }
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      });
      setBlogs(blogs.concat(blog));
      setNewBlog({
        title: "",
        author: "",
        url: "",
      });
      setNotification({
        message: "created successfully",
        type: "success",
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
    } catch (exception) {
      setNotification({
        message: "an errror occured",
        type: "error",
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null,
        });
      }, 5000);
    }
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      ) : (
        <form onSubmit={handleCreateBlog}>
          <div>
            Title:
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
            />
            Author:
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
            Url:
            <input
              type="text"
              name="url"
              value={newBlog.url}
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </div>
          <button type="submit">create</button>
        </form>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
