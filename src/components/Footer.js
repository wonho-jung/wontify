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
  selectFooterAudioState,
  selectPlaying,
  set_footerAudioState,
  set_playing,
  set_playingList,
} from "../features/audioStatusSlice";
function Footer({ audio, currentTime }) {
  const [volume, setVolume] = useState(100);
  const footerAudioState = useSelector(selectFooterAudioState);
  const audioState = useSelector(selectAudioStatus);
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
      set_playingList({
        playingList: footerAudioState.footerAudioState.url,
      })
    );
  };

  const stopSong = () => {
    dispatch(
      set_playing({
        playSong: false,
      })
    );
    dispatch(
      set_playingList({
        playingList: footerAudioState.footerAudioState.url,
      })
    );
  };
  const getFilterList = () => {
    const audioList = footerAudioState.footerAudioState.audioList;
    const filterUrl = audioList.filter((item) =>
      item.track ? item.track.preview_url !== null : item.preview_url !== null
    );
    return filterUrl;
  };

  const getCurrentIndex = () => {
    const audioList = footerAudioState.footerAudioState.audioList;
    const url = footerAudioState.footerAudioState.url;

    let currentIndex = audioList
      .filter((item) => {
        return item.track
          ? item.track.preview_url !== null
          : item.preview_url !== null;
      })
      .findIndex((item) => {
        return item.track
          ? item.track.preview_url === url
          : item.preview_url === url;
      });

    return currentIndex;
  };

  const updateAudioState = (currentIndex, filterList) => {
    const isTrack = !!filterList[currentIndex]?.track;

    const updateState = {
      playSong: true,
      playingList: isTrack
        ? filterList[currentIndex].track.preview_url
        : filterList[currentIndex].preview_url,
      footerAudioState: {
        name: isTrack
          ? filterList[currentIndex].track.name
          : filterList[currentIndex].name,
        url: isTrack
          ? filterList[currentIndex].track.preview_url
          : filterList[currentIndex].preview_url,
        image: isTrack
          ? filterList[currentIndex].track.album.images[0].url
          : filterList[currentIndex].album?.images[0].url,
        albumName: isTrack
          ? filterList[currentIndex].track.album.name
          : filterList[currentIndex].album?.name,
        artistsName: isTrack
          ? filterList[currentIndex].track.artists
          : filterList[currentIndex].artists,
        audioList: filterList,
      },
    };

    dispatch(set_playing(updateState));
    dispatch(set_playingList(updateState));
    dispatch(set_footerAudioState(updateState));
  };

  const prevSong = async () => {
    let currentIndex = await getCurrentIndex();
    let filterList = await getFilterList();

    if (currentIndex === 0) {
      currentIndex = filterList.length - 1;
    } else {
      currentIndex -= 1;
    }

    updateAudioState(currentIndex, filterList);
  };

  const nextSong = async () => {
    let currentIndex = await getCurrentIndex();
    let filterList = await getFilterList();

    if (currentIndex === filterList.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }

    updateAudioState(currentIndex, filterList);
  };
  return (
    <FooterContainer>
      {footerAudioState.footerAudioState ? (
        <FooterLeft>
          {footerAudioState.footerAudioState.image && (
            <img src={footerAudioState.footerAudioState?.image} alt="" />
          )}
          <FooterSongInfo>
            <h1>{footerAudioState.footerAudioState.name}</h1>
            <p>
              {footerAudioState.footerAudioState.artistsName
                ?.map((artist) => artist.name)
                .join(", ")}
              {footerAudioState.footerAudioState.albumName &&
                `/${footerAudioState.footerAudioState.albumName}`}
            </p>
          </FooterSongInfo>
        </FooterLeft>
      ) : (
        <FooterLeft>
          <img
            src="https://avatars.githubusercontent.com/u/62073233?s=400&u=3de8c98fc486dcaa0469a9d1be5f37133bf92aa1&v=4"
            alt=""
          />
          <FooterSongInfo>
            <p>By Sam dev</p>
          </FooterSongInfo>
        </FooterLeft>
      )}

      <FooterCenter>
        <IconContainer>
          <SkipPreviousIcon
            className="icon"
            onClick={audioState ? prevSong : null}
          />
          {audioState?.audioStatus === footerAudioState.footerAudioState?.url &&
          playing ? (
            <PauseCircleOutlineIcon
              onClick={stopSong}
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
          <SkipNextIcon
            onClick={audioState ? nextSong : null}
            className="icon"
          />
        </IconContainer>
        <ProgressBarContainer>
          {currentTime < 10 ? `0:0${currentTime}` : `0:${currentTime}`}

          <ProgressBar>
            <MovingBar style={{ width: currentTime * 16.5 }} />
          </ProgressBar>
          <p>
            {currentTime > 20
              ? `0:0${30 - currentTime}`
              : `0:${30 - currentTime}`}
          </p>
        </ProgressBarContainer>
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
  bottom: 0px;
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
const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProgressBar = styled.div`
  width: 500px;
  height: 4px;
  background: rgb(64, 64, 64);
  border-radius: 4px;
`;
const MovingBar = styled.div`
  margin: 0;

  height: 4px;
  background: #1db954;
  border-radius: 4px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;
