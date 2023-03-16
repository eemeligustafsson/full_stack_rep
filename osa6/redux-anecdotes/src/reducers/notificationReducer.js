import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});
export const { setNotification } = notificationSlice.actions;

export const createNotification = (message) => {
  let timeoutCompleted = false;
  return (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutCompleted) {
      clearTimeout(timeoutCompleted);
    }
    timeoutCompleted = setTimeout(() => dispatch(setNotification(null)), 3500);
  };
};

export default notificationSlice.reducer;
