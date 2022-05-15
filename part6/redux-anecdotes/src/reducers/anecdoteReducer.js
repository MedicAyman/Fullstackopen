import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

//const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVoteAnecdote(state, action) {
      console.log();
      const anecdote = action.payload;
      console.log(anecdote);
      const anecdoteToChange = state.find((a) => a.id === anecdote.id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id !== anecdote.id ? a : changedAnecdote));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, addVoteAnecdote, appendBlog, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const upVote = (object) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(object);
    console.log(updatedAnecdote);
    await dispatch(addVoteAnecdote(updatedAnecdote));
  };
};
export default anecdoteSlice.reducer;
