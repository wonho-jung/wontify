import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { set_categoriesDetail } from "../features/userSlice";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

function SearchArtistPost({ spotify, image, name, id }) {
  const sendSearchDetail = () => {};
  return (
    <PostContainer onClick={sendSearchDetail}>
      <PostContent>
        <img src={image} alt="" />
        <p>{name && name}</p>
        <p>Artist</p>
        <PlayCircleOutlineIcon className="icon" fontSize="large" />
      </PostContent>
    </PostContainer>
  );
}

export default SearchArtistPost;

const PostContainer = styled.div`
  color: white;
  width: 200px;
  height: 250px;
  background-color: #181818;
  margin: 15px;
  border-radius: 20px;

  cursor: pointer;

  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  .icon {
    font-size: 60px;
    position: absolute;
    color: lightgreen;
    top: 100px;
    left: 100px;
    display: none;
  }
  > img {
    height: 150px;
    border-radius: 999px;
  }
  :hover {
    .icon {
      display: block;
    }
  }
`;
