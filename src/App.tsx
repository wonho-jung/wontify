import { useEffect } from "react";
import Player from "./components/Player";
import { useDispatch } from "react-redux";
import { fetchSpotifyCategories } from "./features/spotifyDataSlice";
import "./App.css";
import ErrorScreen from "./components/shared/ErrorScreen";
import LoadingScreen from "components/shared/LoadingScreen";
import { useAppSelector } from "app/hook";

function App() {
  const { status } = useAppSelector((state) => state.spotifyData.categories);

  //TODO: Remove this
  const dispatch = useDispatch();

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
