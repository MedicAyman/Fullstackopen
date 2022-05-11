import React, { useEffect, useState } from "react";
import blogServices from "../services/blog";
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    setLikes((+likes + 1).toString());
    blogServices.update({
      ...blog,
      likes: likes,
    });
  };
  return (
    <div style={blogStyle}>
      <p style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>View</button>{" "}
        <button onClick={addLike}>Like</button>
      </p>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>Author: {blog.author} </p>
        <p>Url: {blog.url}</p>
        <p>Likes: {likes}</p>
        <p>
          <button onClick={addLike}>Like</button>
        </p>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  );
};

export default Blog;
