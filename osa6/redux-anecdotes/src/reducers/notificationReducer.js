import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const createNotification = (message, timeoutInSeconds) => {
  let timeout
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => dispatch(setNotification(null)), timeoutInSeconds * 1000);
  };
};

export default notificationSlice.reducer;