import React, { useState } from "react";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Grid } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAudioStatus,
  selectFooteraudioState,
  selectPlaying,
  set_playing,
  set_playinglist,
} from "../features/userSlice";
function Footer({ audio, currentTime }) {
  const [volume, setVolume] = useState(100);
  const footeraudioState = useSelector(selectFooteraudioState);
  const audiostate = useSelector(selectAudioStatus);
  const playing = useSelector(selectPlaying);
  const dispatch = useDispatch();

  const volumeControl = (event) => {
    setVolume(event);
    audio.volume = volume / 100;
    if (audio.volume === 0.01) {
      audio.volume = 0;
    }
  };

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
            <h1>{footeraudioState.footeraudioState.name}</h1>
            <p>
              {footeraudioState.footeraudioState.artistsName
                ?.map((artist) => artist.name)
                .join(", ")}
              {footeraudioState.footeraudioState.albumName &&
                `/${footeraudioState.footeraudioState.albumName}`}
            </p>
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
        <IconContainer>
          <SkipPreviousIcon />
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
        </IconContainer>
        <ProgressbarContainer>
          {currentTime < 10 ? `0:0${currentTime}` : `0:${currentTime}`}

          <Progressbar>
            <Movingbar style={{ width: currentTime * 16.5 }} />
          </Progressbar>
          <p>
            {currentTime > 20
              ? `0:0${30 - currentTime}`
              : `0:${30 - currentTime}`}
          </p>
        </ProgressbarContainer>
      </FooterCenter>

      <FooterRight>
        <Grid container spacing={2}>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
        <VolumeDownIcon />
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

  justify-content: space-around;
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
  h1 {
    font-size: 16px;
  }
  p {
    font-size: 14px;
    margin-top: 3px;
    color: gray;
  }
`;

const FooterCenter = styled.div`
  flex: 0.4;
  padding: 0 100px;
  color: white;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  .icon:hover {
    transition: transform 0.2s ease-in-out !important;
    transform: scale(1.2) !important;
  }

  .icon {
    font-size: 50px;
    text-justify: center;
    cursor: pointer;
  }
`;

const FooterRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-right: 40px;
  > * .MuiSlider-root {
    color: #1db954;
  }
  input[type="range"] {
    width: 150px;
    background-color: #1db954;
    -webkit-appearance: none;
    height: 5px;
    margin: 0;
    opacity: 0.7;
    ::-webkit-slider-thumb {
      appearance: none;
      width: 15px;
      height: 15px;
      background: #1db954;
      cursor: pointer;
      border-radius: 99px;
    }
    :focus {
      outline: none;
    }
    :hover {
      opacity: 1;
    }
  }
`;
const ProgressbarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Progressbar = styled.div`
  width: 500px;
  height: 4px;
  background: rgb(64, 64, 64);
  border-radius: 4px;
`;
const Movingbar = styled.div`
  margin: 0;

  height: 4px;
  background: #1db954;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
