import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "./firebase";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { set_list, set_Recommended } from "../features/userSlice";
import { Link } from "react-router-dom";

function SongRow({
  track,
  image,
  name,
  albumName,
  recommended,
  artistsName,
  spotify,
  id,
}) {
  const dispatch = useDispatch();
  const addList = () => {
    spotify.addTracksToPlaylist(id, [track.uri]);

    db.collection("tracks").doc(id).collection("track").add({
      image,
      name,
      albumName,
      artistsName,
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

  return (
    <SongRowContainer>
      <img src={image} alt="" />
      <SongRowInfo>
        <h1>{name}</h1>
        <p>
          {artistsName?.map((artist) => artist.name).join(", ")}/{albumName}
        </p>
      </SongRowInfo>

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
  }
  img {
    height: 40px;
    width: 40px;
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
