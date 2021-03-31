import React from "react";

import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectList } from "../features/userSlice";
function DetailPlaylist() {
  const userplaylist = useSelector(selectList);

  return (
    <DetailPlaylistContainer>
      <Header />

      <DetailInfo>
        <img src={userplaylist?.res.images[0].url} alt="" />
        <DetailInfoText>
          <strong>PLAYLIST</strong>
          <h2>{userplaylist?.res.name}</h2>
          <p>{userplaylist?.res.description}</p>
        </DetailInfoText>
      </DetailInfo>

      <DetailSongs>
        <DetailIcons>
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </DetailIcons>

        {userplaylist?.res.tracks.items.map((item, inx) => (
          <SongRow
            url={item.track.preview_url}
            key={inx}
            time={item.track.duration_ms}
            image={item.track.album?.images[0]?.url}
            name={item.track.name}
            albumName={item.track.album.name}
            artistsName={item.track.artists}
          />
        ))}
      </DetailSongs>
    </DetailPlaylistContainer>
  );
}

export default DetailPlaylist;
const DetailPlaylistContainer = styled.div`
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
const DetailInfo = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  > img {
    height: 20vw;
    margin: 0 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;
const DetailInfoText = styled.div`
  flex: 1;
  > h2 {
    font-size: 48px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 14px;
  }
`;

const DetailSongs = styled.div`
  margin: 20px -30px;
  padding-bottom: 80px;
`;
const DetailIcons = styled.div`
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
  }
`;
