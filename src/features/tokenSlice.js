import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },

  reducers: {
    set_token: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { set_token } = tokenSlice.actions;

export const selectToken = (state) => state.token.token;

export default tokenSlice.reducer;
