import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface IArtistName {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface IAudioList {
  albumName: string;
  artistsName: IArtistName[] | null;
  image: string;
  name: string;
  time: number | null;
  url: string | null;
}

interface AudioStatusState {
  currentTime: number;
  isAudioPlaying: boolean;
  currentPlayingURL: string | null;
  footerAudioState: {
    name: string | null;
    image: string | null;
    url: string | null;
    artistsName: IArtistName[] | null;
    albumName: string | null;
    audioList: IAudioList[] | null;
  };
}
const initialAudioStatusState: AudioStatusState = {
  currentTime: 0,
  isAudioPlaying: false,
  currentPlayingURL: null,
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
    set_currentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    set_isAudioPlaying: (state, action) => {
      state.isAudioPlaying = action.payload;
    },

    set_currentPlayingURL: (state, action) => {
      state.currentPlayingURL = action.payload;
    },

    set_footerAudioState: (state, action) => {
      state.footerAudioState = action.payload;
    },
  },
});

export const {
  set_currentTime,
  set_isAudioPlaying,
  set_currentPlayingURL,
  set_footerAudioState,
} = audioStatusSlice.actions;

export const selectCurrentTime = (state: RootState): number =>
  state.audioStatus.currentTime;
export const selectIsAudioPlaying = (state: RootState): boolean =>
  state.audioStatus.isAudioPlaying;
export const selectCurrentPlayingURL = (state: RootState): string | null =>
  state.audioStatus.currentPlayingURL;

export const selectFooterAudioState = (state: RootState) =>
  state.audioStatus.footerAudioState;

export default audioStatusSlice.reducer;
