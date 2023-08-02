import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {
  addSongToPlaylist,
  createPlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
  getPlaylists,
} from "backend";

export interface ISongs {
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
  id: string;
  image: string | null;
  name: string | null;
  time: number | null;
  url: string | null;
}

interface UserPlaylistState {
  // fetchUserPlaylists
  status: "idle" | "loading" | "succeeded" | "failed";
  playlists:
    | {
        name: string;
        _id: string;
        songs: [] | ISongs[];
      }[]
    | [];
  // createNewPlaylist, deleteUserPlaylist, addSongToUserPlaylist, deleteUserPlaylistSong
  isPlaylistUpdated: boolean;
  updatedError:
    | "idle"
    | "createNewPlaylist"
    | "deletePlaylist"
    | "addSongToUserPlaylist"
    | "deleteUserPlaylistSong";
  updatedErrorMessage: string;
}

const initialUserPlaylistState: UserPlaylistState = {
  status: "idle",
  playlists: [],
  //First time load, we need to fetchUserPlaylists
  //When isPlaylistUpdated is true, call fetchUserPlaylists.
  isPlaylistUpdated: true,
  updatedError: "idle",
  updatedErrorMessage: "",
};

export const fetchUserPlaylists = createAsyncThunk(
  "userPlaylist/fetchUserPlaylists",
  async () => {
    const response = await getPlaylists();
    return response.data;
  }
);
export const createNewPlaylist = createAsyncThunk(
  "userPlaylist/createNewPlaylist",
  async (playlistName: string) => {
    await createPlaylist({ name: playlistName });
  }
);
export const deleteUserPlaylist = createAsyncThunk(
  "userPlaylist/deletePlaylist",
  async (playlistId: string) => {
    await deletePlaylist(playlistId);
  }
);
export const addSongToUserPlaylist = createAsyncThunk(
  "userPlaylist/addSongToPlaylist",
  async (props: { song: ISongs; userPlaylistId: string }) => {
    const { song, userPlaylistId } = props;
    await addSongToPlaylist({ data: song, id: userPlaylistId });
  }
);
export const deleteUserPlaylistSong = createAsyncThunk(
  "userPlaylist/deleteUserPlaylistSong",
  async (props: { playlistId: string; songId: string }) => {
    const { playlistId, songId } = props;
    await deleteSongFromPlaylist({ id: playlistId, songId });
  }
);

export const userPlaylistSlice = createSlice({
  name: "userPlaylist",
  initialState: initialUserPlaylistState,

  reducers: {
    reset_updatedError: (state) => {
      state.updatedError = "idle";
      state.updatedErrorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserPlaylists.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserPlaylists.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.playlists = action.payload;
      state.isPlaylistUpdated = false;
    });
    builder.addCase(fetchUserPlaylists.rejected, (state, action) => {
      state.status = "failed";
    });

    // After update playlist, we need to fetchUserPlaylists again.
    // So we set isPlaylistUpdated to true to trigger fetchUserPlaylists.
    builder.addCase(createNewPlaylist.fulfilled, (state, action) => {
      state.isPlaylistUpdated = true;
    });

    builder.addCase(deleteUserPlaylist.fulfilled, (state, action) => {
      state.isPlaylistUpdated = true;
    });

    builder.addCase(addSongToUserPlaylist.fulfilled, (state, action) => {
      state.isPlaylistUpdated = true;
    });
    builder.addCase(deleteUserPlaylistSong.fulfilled, (state, action) => {
      state.isPlaylistUpdated = true;
    });
    //update error
    //TODO: make banner and show up in the top of the page.
    builder.addCase(createNewPlaylist.rejected, (state, action) => {
      state.updatedError = "createNewPlaylist";
      state.updatedErrorMessage =
        "create new playlist failed. Please try again.";
    });
    builder.addCase(deleteUserPlaylist.rejected, (state, action) => {
      state.updatedError = "deletePlaylist";
      state.updatedErrorMessage = "delete playlist failed. Please try again.";
    });
    builder.addCase(addSongToUserPlaylist.rejected, (state, action) => {
      state.updatedError = "addSongToUserPlaylist";
      state.updatedErrorMessage =
        "add song to playlist failed. Please try again.";
    });
    builder.addCase(deleteUserPlaylistSong.rejected, (state, action) => {
      state.updatedError = "deleteUserPlaylistSong";
      state.updatedErrorMessage =
        "delete song from playlist failed. Please try again.";
    });
  },
});

export const { reset_updatedError } = userPlaylistSlice.actions;

export const selectPlaylists = (state: RootState) =>
  state.userPlaylist.playlists;
export const selectIsPlaylistUpdated = (state: RootState) =>
  state.userPlaylist.isPlaylistUpdated;

export default userPlaylistSlice.reducer;
