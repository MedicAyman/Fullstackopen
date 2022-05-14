import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      const message = action.payload;
      console.log(action.payload);
      return message;
    },
  },
});

export const { createNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
