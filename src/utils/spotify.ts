import SpotifyWebApi from "spotify-web-api-js";
import { IState, filteredPlaylists } from "./stateArray";
import { SpotifyCategory } from "features/spotifyDataSlice";

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

export const getSpotifyPlaylist = async (id: string) => {
  const spotify = await getSpotifyAccess();
  const response = await spotify.getPlaylist(id);
  //Fix error TS2339: Property 'preview_url' does not exist on type 'TrackObjectFull | EpisodeObjectFull'.
  //'TrackObjectFull | EpisodeObjectFull' does not contain the property 'preview_url' but it does exist.

  const filteredTracks = response.tracks.items.map((item: any) => {
    return {
      url: item.track.preview_url,
      name: item.track.name,
      time: item.track.duration_ms,
      image: item.track.album.images[0].url,
      albumName: item.track.album.name,
      artistsName: item.track.artists,
    };
  });

  return {
    image: response.images[0].url,
    name: response.name,
    description: response.description,
    tracks: filteredTracks,
  };
};

export const getSearchResult = async (searchInput: string) => {
  const spotify = await getSpotifyAccess();
  const response = await spotify.search(searchInput, ["artist", "track"], {
    limit: 14,
  });

  // Return empty array if no result
  if (response.artists?.items.length === 0) {
    return {
      topId: "",
      topName: "",
      topImage: "",
      topFollowers: 0,
      topGenres: [],
      searchResultArtists: [],
      searchResultTracks: [],
    };
  }
  const searchResultArtists = response.artists!.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.images[0]?.url,
      artistInfo: {
        name: item.name,
        image: item.images[0]?.url,
        followers: item.followers.total,
        genres: item.genres,
      },
    };
  });
  const searchResultTracks = response
    .tracks!.items.filter((item) => !!item.preview_url)
    .map((item) => {
      return {
        url: item.preview_url,
        time: item.duration_ms,
        image: item.album.images[0].url,
        name: item.name,
        albumName: item.album.name,
        artistsName: item.artists,
      };
    });
  // Return re-order array.
  return {
    topId: response.artists!.items[0].id,
    topName: response.artists!.items[0].name,
    topImage: response.artists!.items[0].images[0].url,
    topFollowers: response.artists!.items[0].followers.total,
    topGenres: response.artists!.items[0].genres,
    searchResultArtists,
    searchResultTracks,
  };
};
