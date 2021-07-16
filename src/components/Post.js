import React from "react";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link } from "react-router-dom";
import {connect} from "dva";

function Post({
  image,
  name,
  artistsName,
  description,
  albumId,
  spotify,
  playlistId,
  dispatch
}) {

  const sendAlbumDetail = () => {
    spotify
      .getAlbumTracks(albumId)
      .then((res) => {
          dispatch({
              type: 'global/save',
              payload: {
                  detailAlbumTracks: res,
              }
          });
      })
      .catch((err) => {
        alert(err.message);
      });

    spotify
      .getAlbum(albumId)
      .then((res) => {
        dispatch({
            type: 'global/save',
            payload: {
                detailAlbum: res,
            }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const sendPlaylistDetail = () => {
    spotify
      .getPlaylist(playlistId)
      .then((res) => {
          dispatch({
              type: 'global/save',
              payload: {
                  userplaylist: res,
              }
          });
      })
      .catch((err) => {
        alert(err.message);
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

export default connect(({}) => ({}))(Post);
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
