import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token:
      "BQAb5l9q7d6QfMbgpc7rrVG1jPNY6pwKdKyTE4MxK3Ny8DjUsT3o4hc6e8xz9MoriOktvct6ktr4NQmSgUE0fsALKyBy-Zvo5U68ZQp8w_YwoB",
    playlists: null,
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
    set_playlists: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { set_user, set_token, set_playlists } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectToken = (state) => state.user.token;
export const selectPlaylists = (state) => state.user.playlists;

export default userSlice.reducer;
