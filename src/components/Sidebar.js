import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectPlaylists } from "../features/userSlice";
import { Link } from "react-router-dom";
import SidebarOptions from "./SidebarOptions";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, TextField } from "@mui/material";
import { createPlaylist, getPlaylists } from "../backend";
import FormDialog from "./designSystem";
import { set_playlists } from "../features/userSlice";
function Sidebar({ spotify }) {
  const [createPlaylistDialogOpen, setCreatePlaylistDialogOpen] =
    useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const dispatch = useDispatch();
  const { playlists } = useSelector(selectPlaylists);

  const dialogOpenHandler = () => {
    setCreatePlaylistDialogOpen(true);
  };
  const reloadGetPlaylists = () => {
    return getPlaylists()
      .then((res) => {
        console.log("loaded Data", res.data);
        dispatch(
          set_playlists({
            playlists: res.data,
          })
        );
      })
      .catch((err) => {
        console.log("getPlaylists", err);
      });
  };
  const dialogCloseHandler = () => {
    reloadGetPlaylists()
      .then((res) => {
        console.log("loaded");
      })
      .catch((err) => {
        console.log("getPlaylists", err);
      })
      .finally(() => {
        console.log("finally");
        setCreatePlaylistDialogOpen(false);
        setPlaylistName("");
      });
  };
  const dialogSubmitHandler = () => {
    createPlaylist({ name: playlistName });
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
        <IconButton onClick={dialogOpenHandler}>
          <AddIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      </AddPlayListContainer>
      <FormDialog
        dialogTitle="Create Playlist"
        dialogContentText="Enter a name for your new playlist."
        open={createPlaylistDialogOpen}
        handleClose={dialogCloseHandler}
        handleSubmit={dialogSubmitHandler}
        buttonText="Create"
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
        />
      </FormDialog>
      {!!playlists &&
        playlists.length > 0 &&
        playlists.map((playlist, idx) => (
          <SidebarOptions
            spotify={spotify}
            key={idx}
            id={playlist._id}
            title={playlist.name}
          />
        ))}
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
