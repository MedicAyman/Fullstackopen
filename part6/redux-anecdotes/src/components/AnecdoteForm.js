import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationsReducer";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteContent.value;
    event.target.anecdoteContent.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you voted '${content}'`, 10));
  };
  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input type="text" name="anecdoteContent" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
