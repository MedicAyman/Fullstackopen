import React from "react";
import Anecdote from "./Anecdote";
import { addVoteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector } from "react-redux";

const AnecdotesList = (props) => {
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
