import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
//categoriesDetail
interface CategoriesDetail {
  id: string;
  name: string;
  playlistItems: {
    id: string;
    name: string;
    description: string;
    image: string;
  }[];
}
//artist
interface ArtistDetail {
  artistDetail: {
    preview_url: string;
    time: number;
    image: string;
    name: string;
    albumName: string;
    artistsName: string[];
  }[];
  artistInfo: {
    name: string;
    image: string;
    followers: number;
    genres: string[];
  };
}

// topList, workout, mood, party...
export interface SpotifyPlaylist {
  playlistId: string;
  image: string;
  artistsName: string | null;
  description: string | null;
}

//TODO, fix this
// category
export interface SpotifyCategory {
  href: string;
  icons: {
    height: number | null;
    url: string;
    width: number | null;
  }[];
  id: string;
  name: string;
}

export interface SpotifyCategories {
  categories: {
    href: string;
    items: SpotifyCategory[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
interface SpotifyData {
  topList: SpotifyPlaylist[] | null;
  workout: SpotifyPlaylist[] | null;
  mood: SpotifyPlaylist[] | null;
  party: SpotifyPlaylist[] | null;
  detailAlbum: SpotifyPlaylist[] | null;
  detailAlbumTracks: SpotifyPlaylist[] | null;
  category: any;
  categoryDetail: CategoriesDetail | null;
  artistDetail: ArtistDetail | null;
}
const initialSpotifyDataState: SpotifyData = {
  topList: null,
  workout: null,
  mood: null,
  party: null,
  detailAlbum: null,
  detailAlbumTracks: null,
  category: null,
  categoryDetail: null,
  artistDetail: null,
};

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: initialSpotifyDataState,

  reducers: {
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

    set_artistDetail: (state, action) => {
      state.artistDetail = action.payload;
    },
  },
});

export const {
  set_topList,
  set_workout,
  set_mood,
  set_party,
  set_DetailAlbum,
  set_DetailAlbumTracks,
  set_categories,
  set_categoriesDetail,
  set_artistDetail,
} = spotifyDataSlice.actions;

export const selectTopList = (state: RootState): SpotifyPlaylist[] | null =>
  state.spotifyData.topList;
export const selectWorkout = (state: RootState): SpotifyPlaylist[] | null =>
  state.spotifyData.workout;
export const selectMood = (state: RootState): SpotifyPlaylist[] | null =>
  state.spotifyData.mood;
export const selectParty = (state: RootState): SpotifyPlaylist[] | null =>
  state.spotifyData.party;
export const selectDetailAlbum = (state: RootState): SpotifyPlaylist[] | null =>
  state.spotifyData.detailAlbum;
export const selectDetailAlbumTracks = (
  state: RootState
): SpotifyPlaylist[] | null => state.spotifyData.detailAlbumTracks;
export const selectCategories = (state: RootState): SpotifyCategories | null =>
  state.spotifyData.category;
export const selectCategoriesDetail = (
  state: RootState
): CategoriesDetail | null => state.spotifyData.categoryDetail;
export const selectArtistDetail = (state: RootState): ArtistDetail | null =>
  state.spotifyData.artistDetail;

export default spotifyDataSlice.reducer;
