import React, { createContext, useEffect, useState } from "react";
import Player from "./components/Player";
import { useDispatch } from "react-redux";

import SpotifyWebApi from "spotify-web-api-js";
import {
  set_topList,
  set_workout,
  set_party,
  set_mood,
  set_categories,
} from "./features/spotifyDataSlice";
import "./App.css";
import { getToken } from "./utils/spotify";
import ErrorScreen from "./components/shared/ErrorScreen";
import { IState, filteredPlaylists } from "utils/stateArray";
import LoadingScreen from "components/shared/LoadingScreen";

export const spotifyContext = createContext<SpotifyWebApi.SpotifyWebApiJs>(
  {} as SpotifyWebApi.SpotifyWebApiJs
);

function App() {
  const [isLoadData, setIsLoadData] = useState(false);
  const [hasError, setHasError] = useState(false);
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const token = await getToken();
        spotify.setAccessToken(token);
        //Todo: Data filter that only use in the app.
        const [topList, workout, mood, party, categories] = await Promise.all([
          spotify.getCategoryPlaylists("toplists", { limit: 10 }),
          spotify.getCategoryPlaylists("workout", { limit: 10 }),
          spotify.getCategoryPlaylists("mood", { limit: 10 }),
          spotify.getCategoryPlaylists("party", { limit: 10 }),
          spotify.getCategories(),
        ]);
        dispatch(
          set_topList(
            filteredPlaylists((topList.playlists.items as unknown) as IState[])
          )
        );
        dispatch(
          set_workout(
            filteredPlaylists((workout.playlists.items as unknown) as IState[])
          )
        );
        dispatch(
          set_mood(
            filteredPlaylists((mood.playlists.items as unknown) as IState[])
          )
        );
        dispatch(
          set_party(
            filteredPlaylists((party.playlists.items as unknown) as IState[])
          )
        );
        dispatch(set_categories(categories.categories.items));

        setIsLoadData(true);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchSpotifyData();

    return () => {
      setIsLoadData(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (hasError) {
    return <ErrorScreen />;
  }
  return (
    <div className="app">
      {isLoadData ? (
        <>
          <spotifyContext.Provider value={spotify}>
            <Player />
          </spotifyContext.Provider>
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
}

export default App;
