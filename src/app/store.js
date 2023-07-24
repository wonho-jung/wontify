import { configureStore } from "@reduxjs/toolkit";
import spotifyDataReducer from "../features/spotifyDataSlice";
import tokenReducer from "../features/tokenSlice";
import audioStatusReducer from "../features/audioStatusSlice";
import userPlaylistReducer from "../features/userPlaylistSlice";
export default configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
    token: tokenReducer,
    audioStatus: audioStatusReducer,
    userPlaylist: userPlaylistReducer,
  },
});
