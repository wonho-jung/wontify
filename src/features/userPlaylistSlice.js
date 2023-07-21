import { createSlice } from "@reduxjs/toolkit";

const initialUserPlaylistState = {
  playlists: [],
  playlistId: null,
};

export const userPlaylistSlice = createSlice({
  name: "userPlaylist",
  initialState: initialUserPlaylistState,

  reducers: {
    set_playlists: (state, action) => {
      state.playlists = action.payload;
    },

    set_playlistId: (state, action) => {
      state.playlistId = action.payload;
    },
  },
});

export const { set_playlists, set_playlistId } = userPlaylistSlice.actions;

export const selectPlaylists = (state) => state.userPlaylist.playlists;
export const selectPlaylistId = (state) => state.userPlaylist.playlistId;

export default userPlaylistSlice.reducer;
