import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import styled from "styled-components";
import Loading from "./Loading";
import {connect} from "dva";

function DetailPlaylist({userplaylist}) {
  const [loading, setLoading] = useState("true");
  useEffect(() => {
    if (
      userplaylist &&
      userplaylist.id === window.location.href.split("/")[5]
    ) {
      setLoading(false);
    }
  }, [userplaylist]);
  return (
    <DetailPlaylistContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <DetailInfo>
            <img src={userplaylist?.images[0].url} alt="" />
            <DetailInfoText>
              <strong>PLAYLIST</strong>
              <h2>{userplaylist?.name}</h2>
              <p>{userplaylist?.description}</p>
            </DetailInfoText>
          </DetailInfo>

          <DetailSongs>
            <DetailIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </DetailIcons>

            {userplaylist?.tracks.items.map((item, inx) => (
              <SongRow
                audiolist={userplaylist.tracks.items}
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

export default connect(({global}) => ({...global}))(DetailPlaylist);
const DetailPlaylistContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(#ffafbd, #ffc3a0);
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
