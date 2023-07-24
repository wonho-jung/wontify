import React, { useState, useEffect, useContext } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Loading from "./shared/Loading";
import SongRow from "./shared/SongRow";
import { spotifyContext } from "App";

function DetailPlaylist() {
  const spotify = useContext(spotifyContext);
  const [detailPlaylists, setDetailPlaylists] = useState("");
  const playlistId = window.location?.href.split("/")[4];

  const [isLoadData, setIsLoadData] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getPlaylist = await spotify.getPlaylist(playlistId);
        setDetailPlaylists(getPlaylist);
        setIsLoadData(true);
      } catch (err) {
        alert("something went wrong, please try again", err.message);
        navigate("/home");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <DetailPlaylistContainer>
      {!isLoadData ? (
        <Loading />
      ) : (
        <>
          <DetailInfo>
            <img src={detailPlaylists.images[0].url} alt="" />
            <DetailInfoText>
              <strong>PLAYLIST</strong>
              <h2>{detailPlaylists.name}</h2>
              <p>{detailPlaylists.description}</p>
            </DetailInfoText>
          </DetailInfo>

          <DetailSongs>
            <DetailIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </DetailIcons>

            {detailPlaylists.tracks.items.map((item, inx) => (
              <SongRow
                audioList={detailPlaylists.tracks.items}
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
        </>
      )}
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
