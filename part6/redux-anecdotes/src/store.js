import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationsReducer,
    filter: filterReducer,
  },
});

export default store;
