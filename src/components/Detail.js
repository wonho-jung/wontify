import React from "react";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  selectDetailAlbum,
  selectDetailAlbumTracks,
} from "../features/userSlice";
import { useEffect } from "react";
function Detail({ spotify }) {
  const album = useSelector(selectDetailAlbum);
  const detailAlbumTracks = useSelector(selectDetailAlbumTracks);

  return (
    <BodyContainer>
      <Header spotify={spotify} />

      <BodyInfo>
        <img src={album?.detailAlbum.images[0].url} alt="" />
        <BodyInfoText>
          <strong>PLAYLIST</strong>
          <h2>{album?.detailAlbum.name}</h2>
          <p>{album?.detailAlbum.description}</p>
        </BodyInfoText>
      </BodyInfo>

      <BodySongs>
        <BodyIcons>
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </BodyIcons>

        {/* {detailAlbumTracks?.detailAlbumTracks.items.map((item) => (
          <SongRow
            image={item?.track.album?.images[0]?.url}
            name={item?.track.name}
            albumName={item?.track.album.name}
            artistsName={item?.track.artists}
          />
        ))} */}
      </BodySongs>
    </BodyContainer>
  );
}

export default Detail;
const BodyContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1));
  ::-webkit-scrollbar {
    display: none;
  }
`;
const BodyInfo = styled.div`
  background-size: cover;
  background-repeat: none;
  height: 50vh;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  > img {
    height: 20vw;
    margin: 0 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;
const BodyInfoText = styled.div`
  flex: 1;
  > h2 {
    font-size: 48px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 14px;
  }
`;

const BodySongs = styled.div`
  margin: 20px -30px;
`;
const BodyIcons = styled.div`
  display: flex;
  align-items: center;
  > .MuiSvgIcon-root {
    margin-right: 20px;
  }
  > .body__shuffle {
    font-size: 80px !important;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    :hover {
      transition: 100ms transform ease-in;
      transform: scale(1.08);
    }
  }
`;
