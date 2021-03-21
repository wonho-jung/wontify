import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "./firebase";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPlaying,
  set_AddItem,
  set_list,
  set_playing,
  set_Recommended,
} from "../features/userSlice";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { TurnedInTwoTone } from "@material-ui/icons";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
function SongRow({
  url,
  track,
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
}) {
  const [audioStatus, setAudioStatus] = useState(false);

  const myRef = useRef();
  const dispatch = useDispatch();

  const addList = () => {
    db.collection("tracks").doc(id).collection("track").add({
      image,
      name,
      albumName,
      artistsName,
      time: timeRecommend,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

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
        });
    });
  };

  const playSong = () => {
    setAudioStatus(true);
    dispatch(
      set_playing({
        playSong: true,
        url,
      })
    );
  };
  const stopsong = () => {
    setAudioStatus(false);
    dispatch(
      set_playing({
        playSong: false,
        url,
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
      {time && audioStatus === true && (
        <PauseCircleOutlineIcon
          onClick={stopsong}
          className="icon"
          fontSize="large"
        />
      )}
      {time && audioStatus === false && (
        <PlayCircleOutlineIcon
          onClick={playSong}
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
