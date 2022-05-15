import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationsReducer";
import anecdoteService from "../services/anecdote";
const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdoteContent.value;
    event.target.anecdoteContent.value = "";

    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(createNotification("Anecdote created!"));
    await setTimeout(() => {
      dispatch(removeNotification());
    }, 10000);
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
