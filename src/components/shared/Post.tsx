import React from "react";
import styled from "styled-components";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

import { Link } from "react-router-dom";
interface IPost {
  image: string;
  name?: string | null;
  artistsName?: string | null;
  description?: string | null;
  playlistId: string;
}

function Post({
  image,
  name = null,
  artistsName = null,
  description = null,
  playlistId,
}: IPost) {
  return (
    <PostContainer>
      <Link
        to={`/detail_playlist/${playlistId}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <PostContent>
          <img src={image && image} alt="" />
          <h4>{artistsName && artistsName}</h4>
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
