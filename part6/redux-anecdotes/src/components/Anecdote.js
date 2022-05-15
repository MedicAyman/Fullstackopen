import React from "react";
import { useDispatch } from "react-redux";
import { upVote } from "../reducers/anecdoteReducer";
const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(upVote(anecdote))}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
