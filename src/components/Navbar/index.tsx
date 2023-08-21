import { MouseEvent, useEffect } from "react";
import samLogo from "../../assets/mobile_sam_logo.svg";
import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hook";
import {
  createNewPlaylist,
  deleteUserPlaylist,
  fetchUserPlaylists,
  selectIsPlaylistUpdated,
  selectPlaylists,
} from "features/userPlaylistSlice";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "../shared/designSystem";
import { SAM_PLAY_LIST } from "components/Sidebar";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [createPlaylistDialogOpen, setCreatePlaylistDialogOpen] = useState(
    false
  );
  const [deletePlaylistDialogOpen, setDeletePlaylistDialogOpen] = useState(
    false
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isPlaylistUpdated = useAppSelector(selectIsPlaylistUpdated);
  const playlists = useAppSelector(selectPlaylists);

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
    setAnchorEl(null);
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
    <NavbarContainer>
      <div>
        <img src={samLogo} alt="mobile_logo" />
      </div>
      <div>
        <IconButton
          disableRipple
          id="navPopUpMenu"
          aria-controls="popUpMenu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon
            sx={{
              color: "#ffffff",
            }}
          />
        </IconButton>

        <Menu
          id="popUpMenu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              navigate("/home");
              handleClose();
            }}
          >
            <p>Home</p>
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/search");
              handleClose();
            }}
          >
            <p>Search</p>
          </MenuItem>

          <MenuItem disabled>
            <p>Playlists</p>
          </MenuItem>
          <Divider />

          {playlists.length > 0 &&
            playlists.map((playlist, idx) => (
              <MenuItem
                key={idx}
                onClick={() => {
                  navigate(`/playlist/${playlist._id}`);
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {playlist.name}
                {playlist.name !== SAM_PLAY_LIST && (
                  <IconButton
                    onClick={(event) => {
                      // Prevent parent event from firing
                      event.stopPropagation();
                      setDeletePlaylistDialogOpen(true);
                      setDeleteId(playlist._id);
                    }}
                  >
                    <RemoveCircleOutlineIcon sx={{ color: "#1db954" }} />
                  </IconButton>
                )}
              </MenuItem>
            ))}
          <Divider />

          <MenuItem
            sx={{
              alignItems: "center",
              color: "#1db954",
            }}
            onClick={() => {
              setCreatePlaylistDialogOpen(true);
            }}
          >
            <AddIcon />
            Add new playlist
          </MenuItem>
        </Menu>

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
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #111111;
`;
