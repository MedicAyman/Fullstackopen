import React, { useEffect } from "react";
import Anecdote from "./Anecdote";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const AnecdotesList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
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
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdotesList;
