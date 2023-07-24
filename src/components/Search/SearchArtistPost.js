import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { set_artistDetail } from "../../features/spotifyDataSlice";
import { spotifyContext } from "../Player";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchArtistPost({ image, name, id, artistInfo }) {
  const spotify = useContext(spotifyContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const sendToArtiest = async () => {
    try {
      const res = await spotify.getArtistTopTracks(id, "CA");
      dispatch(
        set_artistDetail({
          artistDetail: res,
          artistInfo: artistInfo,
        })
      );
      history.push(`/artist/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <PostContainer onClick={sendToArtiest}>
      <PostContent>
        <img src={image} alt="artist" />
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
    color: lightGreen;
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
