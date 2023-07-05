import React, { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import styled from "styled-components";

import Loading from "./Loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DetailAlbum({ spotify }) {
  const [loading, setLoading] = useState(true);
  const [detailAlbumTracks, setDetailAlbumTracks] = useState("");
  const [detailAlbum, setDetailAlbum] = useState("");

  const albumId = window.location.href.split("/")[5];
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAlbum = await spotify.getAlbum(albumId);
        const getAlbumTracks = await spotify.getAlbumTracks(albumId);

        setDetailAlbum(getAlbum);
        setDetailAlbumTracks(getAlbumTracks);
        setLoading(false);
      } catch (err) {
        alert("something went wrong, please try again");
        history.push("/");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <DetailAlbumContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DetailInfo>
            <img src={detailAlbum.images[0].url} alt="" />
            <DetailInfoText>
              <strong>PLAYLIST</strong>
              <h2>{detailAlbum.name}</h2>
              <p>{detailAlbum.description}</p>
            </DetailInfoText>
          </DetailInfo>

          <DetailSongs>
            <DetailIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </DetailIcons>

            {detailAlbumTracks &&
              detailAlbumTracks.items.map((item, inx) => (
                <SongRow
                  audiolist={detailAlbumTracks.items}
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
