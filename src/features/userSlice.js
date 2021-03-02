import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    playlists: [],
    playing: false,
    item: null,
  },
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
    set_token: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { set_user, set_token } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
