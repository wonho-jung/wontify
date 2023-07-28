import { configureStore } from "@reduxjs/toolkit";
import spotifyDataReducer from "../features/spotifyDataSlice";
import audioStatusReducer from "../features/audioStatusSlice";
import userPlaylistReducer from "../features/userPlaylistSlice";

const store = configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
    audioStatus: audioStatusReducer,
    userPlaylist: userPlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
