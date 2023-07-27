import { configureStore } from "@reduxjs/toolkit";
import spotifyDataReducer from "../features/spotifyDataSlice";
import tokenReducer from "../features/tokenSlice";
import audioStatusReducer from "../features/audioStatusSlice";
import userPlaylistReducer from "../features/userPlaylistSlice";

const store = configureStore({
  reducer: {
    spotifyData: spotifyDataReducer,
    token: tokenReducer,
    audioStatus: audioStatusReducer,
    userPlaylist: userPlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
