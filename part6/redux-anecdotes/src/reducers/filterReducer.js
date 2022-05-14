import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    query: "",
    anecdotesFiltered: [],
  },
  reducers: {
    filterAnecdotes: (state, action) => {
      const query = action.payload.query;
      const anecdotes = action.payload.anecdotes;

      const filtered = anecdotes.filter((anecdote) =>
        anecdote.content.includes(query)
      );
      console.log(filtered);
      const object = {
        query,
        anecdotesFiltered: filtered,
      };
      return object;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
