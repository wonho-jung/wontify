import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";
import FormDialog from "../shared/designSystem";
import {
  selectPlaylists,
  fetchUserPlaylists,
  createNewPlaylist,
  selectIsPlaylistUpdated,
  deleteUserPlaylist,
} from "../../features/userPlaylistSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useAppDispatch, useAppSelector } from "app/hook";
import samLogo from "../../assets/sam_logo.svg";

export const SAM_PLAY_LIST = "sam_playlist";

function Sidebar() {
  const isPlaylistUpdated = useAppSelector(selectIsPlaylistUpdated);
  const playlists = useAppSelector(selectPlaylists);

  const [createPlaylistDialogOpen, setCreatePlaylistDialogOpen] = useState(
    false
  );
  const [deletePlaylistDialogOpen, setDeletePlaylistDialogOpen] = useState(
    false
  );
  const [playlistName, setPlaylistName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useAppDispatch();

  const playlistExists = playlists.some(
    (playlist) => playlist?.name === playlistName
  );

  const dialogCloseHandler = ({
    setDialogClose,
    setInputValue = null,
  }: {
    setDialogClose: React.Dispatch<React.SetStateAction<boolean>>;
    setInputValue?: React.Dispatch<React.SetStateAction<string>> | null;
  }) => {
    setDialogClose(false);
    if (!!setInputValue) {
      setInputValue("");
    }
  };

  useEffect(() => {
    // Fetch user playlists when component mounts and when playlist is updated
    if (isPlaylistUpdated) {
      dispatch(fetchUserPlaylists());
    }
  }, [dispatch, isPlaylistUpdated]);

  return (
    <SidebarContainer>
      <img src={samLogo} alt="logo" />

      <Link to="/home">
        <SidebarOptions title="Home" Icon={HomeIcon} />
      </Link>
      <Link to="/search">
        <SidebarOptions title="Search" Icon={SearchIcon} />
      </Link>
      <AddPlayListContainer>
        <strong>PLAYLISTS</strong>
        <IconButton
          disabled={playlists.length > 5}
          onClick={() => {
            setCreatePlaylistDialogOpen(true);
          }}
        >
          <AddIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </AddPlayListContainer>
      <HelpText>Share with me your favourites songs</HelpText>
      <hr />
      <FormDialog
        dialogTitle="Create Playlist"
        dialogContentText="Enter a name for your new playlist."
        buttonText="Create"
        open={createPlaylistDialogOpen}
        handleClose={() => {
          dialogCloseHandler({
            setDialogClose: setCreatePlaylistDialogOpen,
            setInputValue: setPlaylistName,
          });
        }}
        handleSubmit={() => {
          dispatch(createNewPlaylist(playlistName));
          dialogCloseHandler({
            setDialogClose: setCreatePlaylistDialogOpen,
            setInputValue: setPlaylistName,
          });
        }}
        buttonDisabled={playlistName === "" || playlistExists}
      >
        <TextField
          sx={{
            //Change Label color
            "& label.Mui-focused": {
              color: "#1db954",
            },
            //Change Border color
            "& .MuiInput-underline:after": {
              borderBottomColor: "#1db954",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1db954",
              },
            },
          }}
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          autoFocus
          margin="dense"
          id="name"
          label="Playlist Name"
          type="text"
          fullWidth
          variant="standard"
          helperText={
            playlistExists
              ? "Playlist name already exists"
              : "Playlist name must be unique"
          }
        />
      </FormDialog>
      {playlists.length > 0 &&
        playlists.map((playlist, idx) => (
          <PlaylistBox key={idx}>
            <SidebarOptions id={playlist._id} title={playlist.name} />
            {playlist.name !== SAM_PLAY_LIST && (
              <IconButton
                onClick={() => {
                  setDeletePlaylistDialogOpen(true);
                  setDeleteId(playlist._id);
                }}
              >
                <RemoveCircleOutlineIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            )}
          </PlaylistBox>
        ))}

      <FormDialog
        dialogTitle="Delete from Playlists?"
        dialogContentText="This action cannot be undone."
        open={deletePlaylistDialogOpen}
        handleClose={() => {
          dialogCloseHandler({
            setDialogClose: setDeletePlaylistDialogOpen,
          });
        }}
        handleSubmit={() => {
          dispatch(deleteUserPlaylist(deleteId));
          dialogCloseHandler({
            setDialogClose: setDeletePlaylistDialogOpen,
          });
        }}
        buttonText="Delete"
      />
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  // overflow-y: overlay;
  // min-height: 100vh;
  // flex: 0.2;
  // background-color: #040404;
  // color: white;
  // min-width: 230px;
  // padding-left: 10px;
  // padding-right: 10px;
  > img {
    height: 70px;
    padding: 10px;
    margin-right: auto;
  }

  > div > strong {
    margin-left: 10px;
    padding: 5px;
    font-size: 12px;
  }
  > hr {
    border: 1px solid #282828;
    width: 90%;
    margin: 10px auto;
  }
`;
const AddPlayListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
const HelpText = styled.p`
  font-size: 12px;
  margin-left: 17px;
`;
const PlaylistBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 10px;
  color: #ffffff;
`;
