import React, { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
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

  return (
    <div style={blogStyle}>
      <p style={hideWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>View</button>
      </p>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>Author: {blog.author} </p>
        <p>Url: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  );
};

export default Blog;
