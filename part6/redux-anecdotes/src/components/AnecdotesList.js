import React, { useEffect } from "react";
import Anecdote from "./Anecdote";
import { addVoteAnecdote, setBlogs } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blog";

const AnecdotesList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const anecdotes = useSelector(({ anecdotes }) => {
    let sortedAnecdotes = [...anecdotes];
    sortedAnecdotes.sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes;
  });

  const filteredAnecdotes = useSelector((state) => {
    if (state.filter.query === "") {
      return anecdotes;
    }
    return state.filter.anecdotesFiltered;
  });

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          addVote={addVoteAnecdote}
        />
      ))}
    </div>
  );
};

export default AnecdotesList;
