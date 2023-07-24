import { createSlice } from "@reduxjs/toolkit";

const initialAudioStatusState = {
  playlists: [],
  playing: false,
  playingList: null,
  audioStatus: null,
  footerAudioState: {
    name: null,
    image: null,
    url: null,
    artistsName: null,
    albumName: null,
    audioList: null,
  },
};

const audioStatusSlice = createSlice({
  name: "audioStatus",
  initialState: initialAudioStatusState,

  reducers: {
    set_playlists: (state, action) => {
      state.playlists = action.payload;
    },
    set_playing: (state, action) => {
      state.playing = action.payload;
    },

    set_playingList: (state, action) => {
      state.playingList = action.payload;
    },
    set_audioStatus: (state, action) => {
      state.audioStatus = action.payload;
    },
    set_footerAudioState: (state, action) => {
      state.footerAudioState = action.payload;
    },
  },
});

export const {
  set_playlists,
  set_playing,
  set_playingList,
  set_audioStatus,
  set_footerAudioState,
} = audioStatusSlice.actions;

export const selectList = (state) => state.audioStatus.userPlaylist;
export const selectPlaying = (state) => state.audioStatus.playing;
export const selectPlayingList = (state) => state.audioStatus.playingList;
export const selectAudioStatus = (state) => state.audioStatus.audioStatus;
export const selectFooterAudioState = (state) =>
  state.audioStatus.footerAudioState;

export default audioStatusSlice.reducer;
