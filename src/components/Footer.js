import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAudioStatus,
  selectFooteraudioState,
  selectPlaying,
  set_playing,
  set_playinglist,
} from "../features/userSlice";
function Footer({ audio }) {
  const [volume, setVolume] = useState(0);
  const footeraudioState = useSelector(selectFooteraudioState);
  const audiostate = useSelector(selectAudioStatus);
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();
  console.log(footeraudioState);
  const volumeControl = (event) => {
    setVolume(event);
    audio.volume = volume / 100;
    if (audio.volume === 0.01) {
      audio.volume = 0;
    }
  };
  console.log(audio.volume);

  const playSong = () => {
    dispatch(
      set_playing({
        playSong: true,
      })
    );
    dispatch(
      set_playinglist({
        playinglist: footeraudioState.footeraudioState.url,
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
        playinglist: footeraudioState.footeraudioState.url,
      })
    );
  };

  return (
    <FooterContainer>
      {footeraudioState.footeraudioState ? (
        <FooterLeft>
          {footeraudioState.footeraudioState.image && (
            <img src={footeraudioState.footeraudioState.image} alt="" />
          )}
          <FooterSongInfo>
            <h4>{footeraudioState.footeraudioState.name}</h4>
          </FooterSongInfo>
        </FooterLeft>
      ) : (
        <FooterLeft>
          <img
            src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3578146698962030&height=300&width=300&ext=1618755507&hash=AeTR_TP5fNgF16LMd_Y"
            alt=""
          />
          <FooterSongInfo>
            <p>By won.9 devoloper</p>
          </FooterSongInfo>
        </FooterLeft>
      )}

      <FooterCenter>
        <SkipPreviousIcon />
        {/* {audiostate?.audioStatus === null ||
          (audiostate?.audioStatus !==
            footeraudioState.footeraudioState?.url && (
            <PlayCircleOutlineIcon
              onClick={playSong}
              className="icon"
              fontSize="large"
            />
          ))}
        {audiostate?.audioStatus === footeraudioState.footeraudioState?.url &&
          playing && (
            <PauseCircleOutlineIcon
              onClick={stopsong}
              className="icon"
              fontSize="large"
            />
          )} */}
        {audiostate?.audioStatus === footeraudioState.footeraudioState?.url &&
        playing ? (
          <PauseCircleOutlineIcon
            onClick={stopsong}
            className="icon"
            fontSize="large"
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={playing ? playSong : null}
            className="icon"
            fontSize="large"
          />
        )}

        <SkipNextIcon />
      </FooterCenter>

      <FooterRight>
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item></Grid>
        </Grid>
        <input
          onChange={(event) => volumeControl(event.target.value)}
          type="range"
          min="0"
          max="100"
          value={volume}
        />
      </FooterRight>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  height: 65px;
  width: 100%;
  background-color: #282828;
  padding: 20px;
`;

const FooterLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  color: white;
  width: 300px;
  > img {
    height: 60px;
    width: 60px;
    margin-right: 20px;
    object-fit: contain;
  }
`;
const FooterSongInfo = styled.div`
  h4 > {
    font-size: 12px;
  }
  p > {
    font-size: 12px;
  }
`;

const FooterCenter = styled.div`
  flex: 0.4;
  padding: 0 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  > .MuiSvgIcon-root:hover {
    transition: transform 0.2s ease-in-out !important;
    transform: scale(1.2) !important;
  }
`;

const FooterRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-right: 40px;
  > * .MuiSlider-root {
    color: green;
  }
  input[type="range"] {
    width: 100%;
    margin: 13.8px 0;
    background-color: transparent;
    -webkit-appearance: none;
  }
`;
