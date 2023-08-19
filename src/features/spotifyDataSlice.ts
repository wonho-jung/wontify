import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getArtistDetail,
  getCategories,
  getCategoryPlaylists,
} from "utils/spotify";
//Todo: Remove this.
//categoriesDetail
// interface CategoriesDetail {
//   id: string;
//   name: string;
//   playlistItems: {
//     id: string;
//     name: string;
//     description: string | null;
//     image: string;
//   }[];
// }
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

interface IArtistInfo {
  name: string;
  image: string;
  followers: number;
  genres: string[];
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
      toplistsData: SpotifyPlaylist[] | null;
      workoutData: SpotifyPlaylist[] | null;
      moodData: SpotifyPlaylist[] | null;
      partyData: SpotifyPlaylist[] | null;
      categoriesData: SpotifyCategory[] | null;
    };
  };
  categoriesByName: {
    status: "idle" | "loading" | "succeeded" | "failed";
    playlistItems:
      | {
          id: string;
          name: string;
          description: string | null;
          image: string;
        }[]
      | [];
  };
  artistDetail: {
    status: "idle" | "loading" | "succeeded" | "failed";
    artist: {
      tracks: IArtistDetail[] | null;
      info: IArtistInfo | null;
    };
  };
}
const initialSpotifyDataState: SpotifyData = {
  categories: {
    status: "idle",
    data: {
      toplistsData: null,
      workoutData: null,
      moodData: null,
      partyData: null,
      categoriesData: null,
    },
  },
  categoriesByName: {
    status: "idle",
    playlistItems: [],
  },
  artistDetail: {
    status: "idle",
    artist: {
      tracks: null,
      info: null,
    },
  },
};

export const fetchSpotifyCategories = createAsyncThunk(
  "spotifyData/fetchSpotifyCategories",
  async () => {
    const response = await getCategories();
    return response;
  }
);

export const fetchCategoryPlaylists = createAsyncThunk(
  "spotifyData/fetchCategoryPlaylists",
  async (id: string) => {
    const response = await getCategoryPlaylists(id);
    return response;
  }
);

export const fetchArtistDetails = createAsyncThunk(
  "spotifyData/fetchArtistDetails",
  async (id: string) => {
    const { newArtistInfo, newArtistTopTracks } = await getArtistDetail(id);

    return {
      artistTracks: newArtistTopTracks,
      artistInfo: newArtistInfo,
    };
  }
);

const spotifyDataSlice = createSlice({
  name: "spotifyData",
  initialState: initialSpotifyDataState,

  reducers: {},
  extraReducers: (builder) => {
    // fetchCategoryPlaylists
    builder.addCase(fetchCategoryPlaylists.pending, (state, action) => {
      state.categoriesByName.status = "loading";
    });
    builder.addCase(fetchCategoryPlaylists.fulfilled, (state, action) => {
      state.categoriesByName.status = "succeeded";

      state.categoriesByName.playlistItems = action.payload;
    });
    builder.addCase(fetchCategoryPlaylists.rejected, (state, action) => {
      state.categoriesByName.status = "failed";
    });
    // fetchSpotifyCategories
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
      state.categories.data.toplistsData = toplistsData;
      state.categories.data.workoutData = workoutData;
      state.categories.data.moodData = moodData;
      state.categories.data.partyData = partyData;
      state.categories.data.categoriesData = categoriesData;
    });
    builder.addCase(fetchSpotifyCategories.rejected, (state, action) => {
      state.categories.status = "failed";
    });

    // fetchArtistTopTracks
    builder.addCase(fetchArtistDetails.pending, (state, action) => {
      state.artistDetail.status = "loading";
    });
    builder.addCase(fetchArtistDetails.fulfilled, (state, action) => {
      state.artistDetail.status = "succeeded";

      state.artistDetail.artist.tracks = action.payload.artistTracks;
      state.artistDetail.artist.info = action.payload.artistInfo;
    });
    builder.addCase(fetchArtistDetails.rejected, (state, action) => {
      state.artistDetail.status = "failed";
    });
  },
});

export default spotifyDataSlice.reducer;
