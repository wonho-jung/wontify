import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { db } from "./firebase";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAudioStatus,
  selectPlaying,
  set_footeraudioState,
  set_list,
  set_playing,
  set_playinglist,
  set_Recommended,
} from "../features/userSlice";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

function SongRow({
  url,
  image,
  name,
  albumName,
  recommended,
  artistsName,
  spotify,
  id,
  trackNumber,
  time,
  timeRecommend,
  audiolist,
  track,
}) {
  const dispatch = useDispatch();
  const audiostate = useSelector(selectAudioStatus);
  const playing = useSelector(selectPlaying);

  // console.log(track);
  const addList = () => {
    spotify
      .addTracksToPlaylist(id, [track.uri])
      .then(
        spotify.getPlaylist(id).then((res) => {
          dispatch(
            set_list({
              res,
            })
          );
        })
      )
      .catch((err) => alert(err.message))
      .finally(
        alert(
          "it's added on your real spotify. Click your playlist again then you will see what you added"
        )
      );

    // db.collection("tracks").doc(id).collection("track").add({
    //   image,
    //   name,
    //   albumName,
    //   artistsName,
    //   time: timeRecommend,
    //   url,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });

    spotify.getPlaylist(id).then((res) => {
      spotify
        .getRecommendations({
          seed_artists: res.tracks.items[0].track.artists[0].id,
          seed_tracks: id,
        })

        .then((recommended) => {
          dispatch(
            set_Recommended({
              recommended,
            })
          );
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  };

  const playSong = () => {
    dispatch(
      set_playing({
        playSong: true,
      })
    );
    dispatch(
      set_playinglist({
        playinglist: url,
      })
    );
    dispatch(
      set_footeraudioState({
        footeraudioState: {
          name,
          url,
          image,
          artistsName,
          albumName,
          audiolist,
        },
      })
    );
  };

  const stopsong = () => {
    dispatch(
      set_playing({
        playSong: false,
      })
    );
    dispatch(
      set_playinglist({
        playinglist: url,
      })
    );
  };

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <SongRowContainer>
      {(time && url !== null && audiostate?.audioStatus === null) ||
        (time && url !== null && audiostate?.audioStatus !== url && (
          <PlayCircleOutlineIcon
            onClick={playSong}
            className="icon"
            fontSize="large"
          />
        ))}
      {time && url !== null && audiostate?.audioStatus === url && playing && (
        <PauseCircleOutlineIcon
          onClick={stopsong}
          className="icon"
          fontSize="large"
        />
      )}

      {trackNumber && <h5>{trackNumber}</h5>}
      {image && <img src={image} alt="" />}

      <SongRowInfo>
        <h1>{name}</h1>
        <p>
          {artistsName?.map((artist) => artist.name).join(", ")}
          {albumName && `/${albumName}`}
        </p>
      </SongRowInfo>

      {time && <p className="time">{millisToMinutesAndSeconds(time)}</p>}
      {recommended && <Button onClick={addList}>ADD</Button>}
    </SongRowContainer>
  );
}

export default SongRow;

const SongRowContainer = styled.div`
  position: relative;

  margin-left: 20px;
  padding: 20px;

  display: flex;

  align-items: center;
  color: white;
  :hover {
    cursor: pointer;
    background-color: black;
    opacity: 0.8;
    .icon {
      display: block;
    }
  }
  img {
    padding-left: 10px;
    height: 40px;
    width: 40px;
  }
  .time {
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 50px;

    align-items: center;
    position: absolute;
    right: 0;
    color: white;
  }
  button {
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 50px;
    background-color: green;
    border-radius: 999px;
    align-items: center;
    position: absolute;
    right: 0;
    color: white;
    :hover {
      border: 2px solid white;
      opacity: 0.7;
    }
  }
  .icon {
    font-size: 25px;
    position: absolute;
    top: 30px;
    left: 0;
    color: lightgreen;
    display: none;
  }
  h5 {
    margin-left: 10px;
  }
`;
const SongRowInfo = styled.div`
  margin-left: 20px;
  h1 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
    margin-top: 3px;
    color: gray;
  }
`;
