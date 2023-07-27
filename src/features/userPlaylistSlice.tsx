import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface IPlaylists {
  name: string;
  _id: string;
  songs: {
    albumName: string;
    artistsName: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    image: string;
    name: string;
    time: number;
    url: string;
  }[];
}

interface UserPlaylistState {
  playlists: IPlaylists[] | [];
  playlistId: string | null;
}

const initialUserPlaylistState: UserPlaylistState = {
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

export const selectPlaylists = (state: RootState) =>
  state.userPlaylist.playlists;
export const selectPlaylistId = (state: RootState) =>
  state.userPlaylist.playlistId;

export default userPlaylistSlice.reducer;
