import { useEffect } from "react";
import Player from "./components/Player";
import { fetchSpotifyCategories } from "./features/spotifyDataSlice";
import "./App.css";
import ErrorScreen from "./components/shared/ErrorScreen";
import LoadingScreen from "components/shared/LoadingScreen";
import { useAppDispatch, useAppSelector } from "app/hook";

function App() {
  // The useAppSelector hook allows you to extract data from the Redux store state using a selector function.
  const { status } = useAppSelector((state) => state.spotifyData.categories);
  const dispatch = useAppDispatch();
  // fetchSpotifyCategories is an async thunk action creator
  // that dispatches a pending action when it starts, and a fulfilled or rejected action when it completes.
  useEffect(() => {
    dispatch(fetchSpotifyCategories());
  }, [dispatch]);

  if (status === "failed") {
    return <ErrorScreen />;
  }
  return (
    <div className="app">
      {status === "succeeded" ? <Player /> : <LoadingScreen />}
    </div>
  );
}

export default App;
