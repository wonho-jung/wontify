import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";
import { createPlaylist, deletePlaylist, getPlaylists } from "../../backend";
import FormDialog from "../shared/designSystem";
import {
  set_playlists,
  selectPlaylists,
} from "../../features/userPlaylistSlice";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
const SAM_PLAY_LIST = "sam_playlist";

function Sidebar() {
  const [createPlaylistDialogOpen, setCreatePlaylistDialogOpen] = useState(
    false
  );
  const [deletePlaylistDialogOpen, setDeletePlaylistDialogOpen] = useState(
    false
  );
  const [playlistName, setPlaylistName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);

  const playlistExists = playlists?.some(
    (playlist) => playlist.name === playlistName
  );

  const dialogOpenHandler = () => {
    setCreatePlaylistDialogOpen(true);
  };
  const reloadGetPlaylists = () => {
    return getPlaylists()
      .then((res) => {
        dispatch(set_playlists(res.data));
      })
      .catch((err) => {
        console.log("getPlaylists", err);
      });
  };
  const createDialogCloseHandler = () => {
    //Reload playlists after 500ms, to give enough time for the backend to create the playlist
    const reloadTimeout = setTimeout(() => {
      reloadGetPlaylists().finally(() => {
        setCreatePlaylistDialogOpen(false);
        setPlaylistName("");
      });
    }, 100);
    return () => clearTimeout(reloadTimeout);
  };
  const createDialogSubmitHandler = () => {
    createPlaylist({ name: playlistName });
  };

  const deleteDialogCloseHandler = () => {
    const reloadTimeout = setTimeout(() => {
      reloadGetPlaylists().finally(() => {
        setDeletePlaylistDialogOpen(false);
        setDeleteId("");
      });
    }, 100);
    return () => clearTimeout(reloadTimeout);
  };
  const deleteDialogSubmitHandler = () => {
    deletePlaylist(deleteId).then(() => {
      reloadGetPlaylists();
    });
  };

  useEffect(() => {
    reloadGetPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarContainer>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <Link to="/" style={{ textDecoration: "none" }}>
        <SidebarOptions title="Home" Icon={HomeIcon} />
      </Link>
      <Link to="/search" style={{ textDecoration: "none" }}>
        <SidebarOptions title="Search" Icon={SearchIcon} />
      </Link>
      <AddPlayListContainer>
        <strong>PLAYLISTS</strong>
        <IconButton
          disabled={playlists && playlists.length > 5}
          onClick={dialogOpenHandler}
        >
          <AddIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </AddPlayListContainer>
      <HelpText>Share with me your favourites songs</HelpText>
      <hr />
      <FormDialog
        dialogTitle="Create Playlist"
        dialogContentText="Enter a name for your new playlist."
        open={createPlaylistDialogOpen}
        handleClose={createDialogCloseHandler}
        handleSubmit={createDialogSubmitHandler}
        buttonText="Create"
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
      {!!playlists &&
        playlists.length > 0 &&
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
        handleClose={deleteDialogCloseHandler}
        handleSubmit={deleteDialogSubmitHandler}
        buttonText="Delete"
      />
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  overflow-y: overlay;
  min-height: 100vh;
  flex: 0.2;
  background-color: #040404;
  color: white;
  min-width: 230px;
  padding-left: 10px;
  padding-right: 10px;
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
