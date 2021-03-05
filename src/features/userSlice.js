import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    playlists: null,
    playing: false,
    item: null,
    honne: null,
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
    set_list: (state, action) => {
      state.honne = action.payload;
    },
  },
});

export const {
  set_user,
  set_token,
  set_playlists,
  set_list,
} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectToken = (state) => state.user.token;
export const selectPlaylists = (state) => state.user.playlists;
export const selectList = (state) => state.user.honne;

export default userSlice.reducer;
