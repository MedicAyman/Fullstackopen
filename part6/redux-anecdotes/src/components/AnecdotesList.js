import React, { useEffect } from "react";
import Anecdote from "./Anecdote";
import {
  addVoteAnecdote,
  setAnecdotes,
  initializeAnecdotes,
} from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/anecdote";

const AnecdotesList = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

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
