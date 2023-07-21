import React from "react";
import styled from "styled-components";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { Link } from "react-router-dom";

function Post({ image, name, artistsName, description, albumId, playlistId }) {
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
        <PostContent>
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
    color: lightGreen;
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
