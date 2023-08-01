import SpotifyWebApi from "spotify-web-api-js";
import { IState, filteredPlaylists } from "./stateArray";
import { SpotifyCategory } from "features/spotifyDataSlice";

// Get token from Spotify API

export const getToken = async () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET_KEY;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();

  return data.access_token;
};

export const getSpotifyAccess = async () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET_KEY;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(data.access_token);

  return spotify;
};

export const getCategories = async () => {
  const spotify = await getSpotifyAccess();

  const [toplists, workout, mood, party, categories] = await Promise.all([
    spotify.getCategoryPlaylists("toplists", { limit: 10 }),
    spotify.getCategoryPlaylists("workout", { limit: 10 }),
    spotify.getCategoryPlaylists("mood", { limit: 10 }),
    spotify.getCategoryPlaylists("party", { limit: 10 }),
    spotify.getCategories(),
  ]);
  const toplistsData = filteredPlaylists(
    (toplists.playlists.items as unknown) as IState[]
  );
  const workoutData = filteredPlaylists(
    (workout.playlists.items as unknown) as IState[]
  );
  const moodData = filteredPlaylists(
    (mood.playlists.items as unknown) as IState[]
  );
  const partyData = filteredPlaylists(
    (party.playlists.items as unknown) as IState[]
  );
  const categoriesData = categories.categories.items as SpotifyCategory[];

  return {
    toplistsData,
    workoutData,
    moodData,
    partyData,
    categoriesData,
  };
};

export const getCategoryPlaylists = async (id: string) => {
  const spotify = await getSpotifyAccess();

  const response = await spotify.getCategoryPlaylists(id, {
    limit: 10,
  });
  const newPlaylistItems = response.playlists.items
    .filter((item) => item !== null)
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.images[0].url,
      };
    });
  return newPlaylistItems;
};

export const getArtistDetail = async (id: string) => {
  const spotify = await getSpotifyAccess();

  const artistInfo = await spotify.getArtist(id);
  const artistTopTracks = await spotify.getArtistTopTracks(id, "CA");
  const newArtistInfo = {
    followers: artistInfo.followers.total,
    genres: artistInfo.genres,
    image: artistInfo.images[0].url,
    name: artistInfo.name,
  };
  const newArtistTopTracks = artistTopTracks.tracks.map((track) => {
    return {
      url: track.preview_url,
      time: track.duration_ms,
      image: track.album.images[0].url,
      name: track.name,
      albumName: track.album.name,
      artistsName: track.artists,
    };
  });
  return {
    newArtistInfo,
    newArtistTopTracks,
  };
};
