import React from "react";
import { useDispatch } from "react-redux";
import Anecdote from "./Anecdote";
import { addVote } from "../reducers/anecdoteReducer";
const AnecdotesList = ({ anecdotes }) => {
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} addVote={addVote} />
      ))}
    </div>
  );
};

export default AnecdotesList;
