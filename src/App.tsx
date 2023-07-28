import React, { createContext, useEffect } from "react";
import Player from "./components/Player";
import { useDispatch } from "react-redux";

import SpotifyWebApi from "spotify-web-api-js";
import { fetchSpotifyCategories } from "./features/spotifyDataSlice";
import "./App.css";
import ErrorScreen from "./components/shared/ErrorScreen";
import LoadingScreen from "components/shared/LoadingScreen";
import { useAppSelector } from "app/hook";

export const spotifyContext = createContext<SpotifyWebApi.SpotifyWebApiJs>(
  {} as SpotifyWebApi.SpotifyWebApiJs
);

function App() {
  const { status } = useAppSelector((state) => state.spotifyData.categories);

  //TODO: Remove this
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpotifyCategories());
  }, [dispatch]);
  if (status === "failed") {
    return <ErrorScreen />;
  }
  return (
    <div className="app">
      {status === "succeeded" ? (
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
