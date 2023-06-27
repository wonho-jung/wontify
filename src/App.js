import React, { useEffect } from "react";

import "./App.css";
import Player from "./components/Player";
import { _getToken } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDispatch } from "react-redux";
import {
  set_newReleases,
  set_topList,
  set_workout,
  set_party,
  set_mood,
  set_categories,
} from "./features/userSlice";

function App() {
  const spotify = new SpotifyWebApi();
  const dispatch = useDispatch();
  useEffect(() => {
    _getToken().then((res) => {
      spotify.setAccessToken(res);
      // spotify
      //   .getMe()
      //   .then((user) => {
      //     dispatch(
      //       set_user({
      //         user,
      //       })
      //     );
      //   })
      //   .catch((err) => {
      //     console.log("getMe", err);
      //   });
      // spotify
      //   .getUserPlaylists()
      //   .then((playlists) => {
      //     dispatch(
      //       set_playlists({
      //         playlists,
      //       })
      //     );
      //   })
      //   .catch((err) => {
      //     console.log("getUserPlaylists", err);
      //   });

      // spotify
      //   .getMyRecentlyPlayedTracks({ limit: 16 })
      //   .then((recentlyPlayed) => {
      //     dispatch(
      //       set_recentlyPlayed({
      //         recentlyPlayed: recentlyPlayed.items,
      //       })
      //     );
      //   })
      //   .catch((err) => {
      //     console.log("getUserPlaylists", err);
      //   });
      spotify.getNewReleases({ limit: 10 }).then((newReleases) => {
        dispatch(
          set_newReleases({
            newReleases: newReleases.albums.items,
          })
        );
      });

      spotify
        .getCategoryPlaylists("toplists", { limit: 10 })
        .then((topList) => {
          dispatch(
            set_topList({
              topList: topList.playlists.items,
            })
          );
        });
      spotify.getCategoryPlaylists("workout", { limit: 10 }).then((workout) => {
        dispatch(
          set_workout({
            workout: workout.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("mood", { limit: 10 }).then((mood) => {
        dispatch(
          set_mood({
            mood: mood.playlists.items,
          })
        );
      });
      spotify.getCategoryPlaylists("party", { limit: 10 }).then((party) => {
        dispatch(
          set_party({
            party: party.playlists.items,
          })
        );
      });

      spotify.getCategories().then((category) => {
        dispatch(
          set_categories({
            category,
          })
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Player spotify={spotify} />
    </div>
  );
}

export default App;
