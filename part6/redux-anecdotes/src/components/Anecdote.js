import React from "react";
import { useDispatch } from "react-redux";
const Anecdote = ({ anecdote, addVote }) => {
  const dispatch = useDispatch();
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
