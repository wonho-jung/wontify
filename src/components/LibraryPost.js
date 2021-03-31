import React from "react";
import styled from "styled-components";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  set_list,
  set_playlistid,
  set_Recommended,
} from "../features/userSlice";
import { Link } from "react-router-dom";

function LibraryPost({ image, name, description, id, spotify }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const click = () => {
    dispatch(
      set_playlistid({
        playlistid: id,
      })
    );
    spotify.getPlaylist(id).then((res) => {
      dispatch(
        set_list({
          res,
        })
      );
      spotify
        .getRecommendations({
          seed_artists: res.tracks.items[0].track.artists[0].id,
          seed_tracks: id,
        })
        .then((recommended) => {
          dispatch(
            set_Recommended({
              recommended,
            })
          );
        });
    });
  };

  return (
    <PostContainer>
      <Link to={`/${id}`} style={{ textDecoration: "none", color: "white" }}>
        <PostContent onClick={click}>
          <img src={image} alt="" />
          <p>{name && name}</p>
          <p>{description ? description : `by ${user?.user.display_name}`}</p>
        </PostContent>
        <PlayCircleOutlineIcon className="icon" fontSize="large" />
      </Link>
    </PostContainer>
  );
}

export default LibraryPost;

const PostContainer = styled.div`
  width: 300px;
  height: 350px;
  background-color: #181818;
  margin: 20px;
  position: relative;
  cursor: pointer;
  .icon {
    font-size: 60px;
    position: absolute;
    top: 200px;
    left: 200px;
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
    height: 250px;
  }
`;
