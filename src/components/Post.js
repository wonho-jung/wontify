import React from "react";
import styled from "styled-components";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useDispatch } from "react-redux";
import {
  set_DetailAlbum,
  set_DetailAlbumTracks,
  set_list,
} from "../features/userSlice";
import { Link } from "react-router-dom";

function Post({
  image,
  name,
  artistsName,
  description,
  albumId,
  spotify,
  playlistId,
}) {
  const dispatch = useDispatch();

  const sendAlbumDetail = () => {
    spotify.getAlbumTracks(albumId).then((res) => {
      dispatch(
        set_DetailAlbumTracks({
          detailAlbumTracks: res,
        })
      );
    });
    spotify.getAlbum(albumId).then((res) => {
      dispatch(
        set_DetailAlbum({
          detailAlbum: res,
        })
      );
    });
  };
  const sendPlaylistDetail = () => {
    spotify.getPlaylist(playlistId).then((res) => {
      dispatch(
        set_list({
          res,
        })
      );
    });
  };

  return (
    <PostContainer>
      <Link
        to={
          albumId
            ? `/detail/album/${albumId}`
            : `/detail/playlist/${playlistId}`
        }
        style={{ textDecoration: "none", color: "white" }}
      >
        <PostContent onClick={albumId ? sendAlbumDetail : sendPlaylistDetail}>
          <img src={image} alt="" />
          <h4>{artistsName}</h4>
          <p>{name && name}</p>
          <p>{description && description}</p>
        </PostContent>
        <PlayCircleOutlineIcon className="icon" fontSize="large" />
      </Link>
    </PostContainer>
  );
}

export default Post;
const PostContainer = styled.div`
  max-width: 180px;
  background-color: #181818;
  margin: 10px;
  position: relative;
  cursor: pointer;
  .icon {
    font-size: 60px;
    position: absolute;
    top: 100px;
    left: 100px;
    color: lightgreen;
    display: none;
  }
  opacity: 0.7;

  :hover {
    opacity: 1;
    .icon {
      display: block;
    }
  }
`;
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 140px;
  }
`;
