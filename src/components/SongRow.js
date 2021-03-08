import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

function SongRow({ track, recommended, spotify, id }) {
  const addList = () => {
    spotify.addTracksToPlaylist(id, [track.uri]);
  };
  return (
    <SongRowContainer>
      <img src={track?.album?.images[0].url} alt="" />
      <SongRowInfo>
        <h1>{track?.name}</h1>
        <p>
          {track?.artists.map((artist) => artist.name).join(",")}/
          {track?.album.name}
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
