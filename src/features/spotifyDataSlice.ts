import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { getCategories } from "utils/spotify";
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
export interface IArtistDetail {
  url: string;
  time: number;
  image: string;
  name: string;
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
}

interface ArtistDetail {
  artistDetail: IArtistDetail[];
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

interface SpotifyData {
  categories: {
    status: "idle" | "loading" | "succeeded" | "failed";
    data: {
      toplistsData: SpotifyPlaylist[];
      workoutData: SpotifyPlaylist[];
      moodData: SpotifyPlaylist[];
      partyData: SpotifyPlaylist[];
      categoriesData: SpotifyCategory[];
    } | null;
  };
  topList: SpotifyPlaylist[] | null;
  workout: SpotifyPlaylist[] | null;
  mood: SpotifyPlaylist[] | null;
  party: SpotifyPlaylist[] | null;
  category: SpotifyCategory[] | null;
  categoryDetail: CategoriesDetail | null;
  artistDetail: ArtistDetail | null;
}
const initialSpotifyDataState: SpotifyData = {
  categories: {
    status: "idle",
    data: null,
  },
  topList: null,
  workout: null,
  mood: null,
  party: null,
  category: null,
  categoryDetail: null,
  artistDetail: null,
};

export const fetchSpotifyCategories = createAsyncThunk(
  "spotifyData/fetchSpotifyCategories",
  async () => {
    const response = await getCategories();
    return response;
  }
);
// const fetchCategoryPlaylists = createAsyncThunk(
//   "spotifyData/fetchCategoryPlaylists",
//   async (id) => {
//     const response = await getCategoryPlaylists(id);
//     return response;
//   }
// );
// const fetchArtistTopTracks = createAsyncThunk(
//   "spotifyData/fetchArtistTopTracks",
//   async (id) => {
//     const response = await getCategoryPlaylists(id);
//     return response;
//   }
// );

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
  extraReducers: (builder) => {
    builder.addCase(fetchSpotifyCategories.pending, (state, action) => {
      state.categories.status = "loading";
    });
    builder.addCase(fetchSpotifyCategories.fulfilled, (state, action) => {
      state.categories.status = "succeeded";
      const {
        categoriesData,
        moodData,
        partyData,
        toplistsData,
        workoutData,
      } = action.payload;
      state.topList = toplistsData;
      state.workout = workoutData;
      state.mood = moodData;
      state.party = partyData;
      state.category = categoriesData;
    });
    builder.addCase(fetchSpotifyCategories.rejected, (state, action) => {
      state.categories.status = "failed";
    });

    // builder.addCase(fetchCategoryPlaylists.fulfilled, (state, action) => {
    //   // state.categoryDetail = action.payload;
    // });
    // builder.addCase(fetchArtistTopTracks.fulfilled, (state, action) => {
    //   // state.artistDetail = action.payload;
    // });
  },
});

export const {
  set_topList,
  set_workout,
  set_mood,
  set_party,
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
export const selectCategories = (state: RootState): SpotifyCategory[] | null =>
  state.spotifyData.category;
export const selectCategoriesDetail = (
  state: RootState
): CategoriesDetail | null => state.spotifyData.categoryDetail;
export const selectArtistDetail = (state: RootState): ArtistDetail | null =>
  state.spotifyData.artistDetail;

export default spotifyDataSlice.reducer;
