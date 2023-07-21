import { createSlice } from "@reduxjs/toolkit";

const initialSpotifyDataState = {
  newReleases: null,
  topList: null,
  workout: null,
  mood: null,
  party: null,
  detailAlbum: null,
  detailAlbumTracks: null,
  category: null,
  categoryDetail: null,
  searchResult: null,
  artistDetail: null,
};

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: initialSpotifyDataState,

  reducers: {
    set_newReleases: (state, action) => {
      state.newReleases = action.payload;
    },
    set_topList: (state, action) => {
      state.topList = action.payload;
    },
    set_workout: (state, action) => {
      state.workout = action.payload;
    },
    set_mood: (state, action) => {
      state.mood = action.payload;
    },
    set_party: (state, action) => {
      state.party = action.payload;
    },
    set_DetailAlbum: (state, action) => {
      state.detailAlbum = action.payload;
    },
    set_DetailAlbumTracks: (state, action) => {
      state.detailAlbumTracks = action.payload;
    },
    set_categories: (state, action) => {
      state.category = action.payload;
    },
    set_categoriesDetail: (state, action) => {
      state.categoryDetail = action.payload;
    },
    set_searchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    set_artistDetail: (state, action) => {
      state.artistDetail = action.payload;
    },
  },
});

export const {
  set_newReleases,
  set_topList,
  set_workout,
  set_mood,
  set_party,
  set_DetailAlbum,
  set_DetailAlbumTracks,
  set_categories,
  set_categoriesDetail,
  set_searchResult,
  set_artistDetail,
} = spotifyDataSlice.actions;

export const selectNewReleases = (state) => state.spotifyData.newReleases;
export const selectTopList = (state) => state.spotifyData.topList;
export const selectWorkout = (state) => state.spotifyData.workout;
export const selectMood = (state) => state.spotifyData.mood;
export const selectParty = (state) => state.spotifyData.party;
export const selectDetailAlbum = (state) => state.spotifyData.detailAlbum;
export const selectDetailAlbumTracks = (state) =>
  state.spotifyData.detailAlbumTracks;
export const selectCategories = (state) => state.spotifyData.category;
export const selectCategoriesDetail = (state) =>
  state.spotifyData.categoryDetail;
export const selectSearchResult = (state) => state.spotifyData.searchResult;
export const selectArtistDetail = (state) => state.spotifyData.artistDetail;

export default spotifyDataSlice.reducer;
