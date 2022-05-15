import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      console.log("called");
      console.log("notif", action.payload);
      const message = action.payload;

      return message;
    },
    removeNotification(state) {
      return null;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    await setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
export default notificationSlice.reducer;
