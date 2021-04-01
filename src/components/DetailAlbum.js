import React, { useState } from "react";
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
import Loading from "./Loading";
import { useEffect } from "react";

function DetailAlbum() {
  const [loading, setLoading] = useState("true");
  const album = useSelector(selectDetailAlbum);
  const detailAlbumTracks = useSelector(selectDetailAlbumTracks);
  useEffect(() => {
    if (album && album?.detailAlbum.id === window.location.href.split("/")[5]) {
      setLoading(false);
    }
  }, [album]);
  return (
    <DetailAlbumContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <DetailInfo>
            <img src={album?.detailAlbum.images[0].url} alt="" />
            <DetailInfoText>
              <strong>PLAYLIST</strong>
              <h2>{album?.detailAlbum.name}</h2>
              <p>{album?.detailAlbum.description}</p>
            </DetailInfoText>
          </DetailInfo>

          <DetailSongs>
            <DetailIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </DetailIcons>

            {detailAlbumTracks &&
              detailAlbumTracks.detailAlbumTracks.items.map((item, inx) => (
                <SongRow
                  url={item.preview_url}
                  key={inx}
                  trackNumber={inx + 1}
                  name={item.name}
                  artistsName={item.artists}
                  time={item.duration_ms}
                />
              ))}
          </DetailSongs>
        </>
      )}
    </DetailAlbumContainer>
  );
}

export default DetailAlbum;
const DetailAlbumContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(#42275a, #734b6d);
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
