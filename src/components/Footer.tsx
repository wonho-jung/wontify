import React, { useContext, useState } from "react";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Grid } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDispatch } from "react-redux";

import {
  set_currentTime,
  set_footerAudioState,
  set_isAudioPlaying,
  set_currentPlayingURL,
  IAudioList,
} from "../features/audioStatusSlice";
import { audioContext } from "./Player";
import { useAppSelector } from "app/hook";

function Footer() {
  const audioObject = useContext(audioContext);

  const {
    isAudioPlaying,
    currentPlayingURL,
    footerAudioState,
    currentTime,
  } = useAppSelector((state) => state.audioStatus);
  const isFooterStateEmpty = Object.values(footerAudioState).every(
    (item) => !item
  );
  const [volume, setVolume] = useState(100);

  const dispatch = useDispatch();
  const volumeControl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value));
    audioObject!.current!.volume = volume / 100;
    if (audioObject!.current!.volume === 0.01) {
      audioObject!.current!.volume = 0;
    }
  };

  const playSong = () => {
    if (!footerAudioState.url) {
      return;
    }
    dispatch(set_isAudioPlaying(true));
    dispatch(set_currentPlayingURL(footerAudioState.url));
    audioObject!.current!.src = footerAudioState.url;
    audioObject!.current!.play();
    audioObject!.current!.addEventListener("ended", () => {
      dispatch(set_isAudioPlaying(false));
      dispatch(set_currentPlayingURL(null));
      dispatch(set_currentTime(0));
    });
    audioObject!.current!.ontimeupdate = (e) => {
      const audioElement = e.target as HTMLAudioElement; // Cast to HTMLAudioElement
      dispatch(set_currentTime(Math.ceil(audioElement.currentTime)));
    };
  };

  const stopSong = () => {
    audioObject!.current!.pause();

    audioObject!.current!.ontimeupdate = (e) => {
      dispatch(set_currentTime(0));
    };
    dispatch(set_isAudioPlaying(false));
    dispatch(set_currentPlayingURL(null));
  };
  const getFilterList = () => {
    const filterUrl = footerAudioState.audioList!.filter((item) => !!item.url);
    return filterUrl;
  };

  const getCurrentIndex = () => {
    const audioList = footerAudioState.audioList;
    const url = footerAudioState.url;

    let currentIndex = audioList!
      .filter((item) => !!item.url)
      .findIndex((item) => item.url === url);

    return currentIndex;
  };

  const updateAudioState = (currentIndex: number, filterList: IAudioList[]) => {
    const updateState = {
      name: filterList[currentIndex].name,
      url: filterList[currentIndex].url,
      image: filterList[currentIndex].image,
      albumName: filterList[currentIndex].albumName,
      artistsName: filterList[currentIndex].artistsName,
      audioList: filterList,
    };
    if (isAudioPlaying) {
      dispatch(set_currentPlayingURL(updateState.url));
      audioObject!.current!.src = updateState.url ?? "";
      audioObject!.current!.play();

      audioObject!.current!.ontimeupdate = (e) => {
        const audioElement = e.target as HTMLAudioElement; // Cast to HTMLAudioElement
        dispatch(set_currentTime(Math.ceil(audioElement.currentTime)));
      };
      audioObject!.current!.addEventListener("ended", () => {
        dispatch(set_isAudioPlaying(false));
        dispatch(set_currentPlayingURL(null));
        dispatch(set_currentTime(0));
      });
    }

    dispatch(set_footerAudioState(updateState));
  };

  const prevSong = async () => {
    if (!footerAudioState.audioList) {
      return;
    }
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
    if (!footerAudioState.audioList) {
      return;
    }
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
      {!isFooterStateEmpty ? (
        <FooterLeft>
          {footerAudioState.image && (
            <img src={footerAudioState.image} alt="" />
          )}
          <FooterSongInfo>
            <h1>{footerAudioState.name}</h1>
            <p>
              {!!footerAudioState.artistsName &&
                footerAudioState.artistsName
                  .map((artist) => artist.name)
                  .join(", ")}
              {footerAudioState.albumName && `/${footerAudioState.albumName}`}
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
          <SkipPreviousIcon className="icon" onClick={prevSong} />
          {currentPlayingURL === footerAudioState.url && isAudioPlaying ? (
            <PauseCircleOutlineIcon
              onClick={stopSong}
              className="icon"
              fontSize="large"
            />
          ) : (
            <PlayCircleOutlineIcon
              onClick={playSong}
              className="icon"
              fontSize="large"
            />
          )}
          <SkipNextIcon onClick={nextSong} className="icon" />
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
          onChange={volumeControl}
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
