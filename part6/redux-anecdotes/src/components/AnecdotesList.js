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
  return (
    <div>
      {anecdotes.map((anecdote) => (
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
