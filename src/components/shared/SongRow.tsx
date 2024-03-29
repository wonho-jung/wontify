import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import {
  set_footerAudioState,
  set_isAudioPlaying,
  set_currentPlayingURL,
  set_currentTime,
} from "../../features/audioStatusSlice";
import {
  addSongToUserPlaylist,
  deleteUserPlaylistSong,
  selectPlaylists,
} from "../../features/userPlaylistSlice";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

import FormDialog from "./designSystem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { audioContext } from "components/Player";
import { useAppDispatch, useAppSelector } from "app/hook";

interface ISongRow {
  url: string | null;
  image: string | null;
  name: string | null;
  albumName: string;
  artistsName: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  time: number | null;
  audioList: {
    url: string | null;
    image: string | null;
    name: string | null;
    albumName: string;
    artistsName: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
  }[];
  isUserPlaylist?: boolean;
  id?: string;
  playlistId?: string;
}
function SongRow({
  url,
  image,
  name,
  albumName,
  artistsName,
  time,
  audioList,
  isUserPlaylist = false,
  id = "",
  playlistId = "",
}: ISongRow) {
  const dispatch = useAppDispatch();
  const { currentPlayingURL } = useAppSelector((state) => state.audioStatus);
  const playlists = useAppSelector(selectPlaylists);
  const [addSongDialogOpen, setAddSongDialogOpen] = useState(false);
  const [userPlaylistId, setUserPlaylistId] = useState("");
  const audioObject = useContext(audioContext);

  const deleteSongHandler = () => {
    dispatch(
      deleteUserPlaylistSong({
        playlistId,
        songId: id,
      })
    );
  };
  const dialogOpenHandler = () => {
    setAddSongDialogOpen(true);
  };
  const dialogCloseHandler = () => {
    setUserPlaylistId("");
    setAddSongDialogOpen(false);
  };
  const dialogSubmitHandler = () => {
    dispatch(
      addSongToUserPlaylist({
        song: {
          id: uuidv4(),
          url,
          image,
          name,
          albumName,
          artistsName,
          time,
        },
        userPlaylistId,
      })
    );
    dialogCloseHandler();
  };

  const playSong = () => {
    dispatch(set_currentPlayingURL(url));
    dispatch(set_isAudioPlaying(true));
    dispatch(
      set_footerAudioState({
        name: name,
        url,
        image,
        artistsName,
        albumName,
        audioList,
      })
    );
    audioObject!.current!.src = url ?? "";
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

  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = parseInt(((millis % 60000) / 1000).toFixed(0)); // Convert back to number
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <SongRowContainer>
      {!!time && !!url && currentPlayingURL !== url && (
        <PlayCircleOutlineIcon
          onClick={playSong}
          className="icon"
          fontSize="large"
        />
      )}
      {!!time && !!url && currentPlayingURL === url && (
        <PauseCircleOutlineIcon
          onClick={stopSong}
          className="icon"
          fontSize="large"
        />
      )}
      {image && <img src={image} alt="" />}
      <SongRowInfo>
        <h1>{name}</h1>
        <p>
          {artistsName?.map((artist: any) => artist.name).join(", ")}
          {albumName && `/${albumName}`}
        </p>
      </SongRowInfo>
      {time && <p className="time">{millisToMinutesAndSeconds(time)}</p>}

      {!isUserPlaylist && (
        <>
          <Button onClick={dialogOpenHandler}>ADD</Button>
          <FormDialog
            dialogTitle="Add to Playlist"
            dialogContentText="Select a playlist to add this song to"
            open={addSongDialogOpen}
            handleClose={dialogCloseHandler}
            handleSubmit={dialogSubmitHandler}
            buttonText="Add"
          >
            <Box sx={{ minWidth: 120, marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#1db954",
                    },
                  }}
                  id="simple-select-label"
                >
                  Playlists
                </InputLabel>
                <Select
                  sx={{
                    "& label.Mui-focused": {
                      color: "#1db954",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1db954",
                    },
                  }}
                  labelId="simple-select-label"
                  id="simple-select"
                  value={userPlaylistId}
                  label="Playlist"
                  onChange={(e) => {
                    setUserPlaylistId(e.target.value);
                  }}
                >
                  {playlists?.map((playlist: any, index: number) => (
                    <MenuItem
                      key={index}
                      disabled={playlist.songs?.some(
                        (obj: any) => obj.url === url
                      )}
                      value={playlist._id}
                    >
                      {playlist.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </FormDialog>
        </>
      )}

      {isUserPlaylist && <Button onClick={deleteSongHandler}>Delete</Button>}
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
    right: 100px;
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
      border: 1px solid white;
      opacity: 0.7;
    }
  }
  .icon {
    font-size: 25px;
    position: absolute;
    top: 30px;
    left: 0;
    color: lightGreen;
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
