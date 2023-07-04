import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectPlaylists } from "../features/userSlice";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import { useLocation } from "react-router-dom";
import { getplaylistDetails } from "../backend";

// import Loading from "./Loading";

function Body({ spotify }) {
  // const [loading, setLoading] = useState(false);
  const [songlists, setSonglists] = useState([]);
  const [userAudioList, setUserAudioList] = useState([]);
  const { playlists } = useSelector(selectPlaylists);
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPathSegment = currentPath.substring(
    currentPath.lastIndexOf("/") + 1
  );
  const playlistName = playlists?.find(
    (item) => item._id === lastPathSegment
  )?.name;

  useEffect(() => {
    getplaylistDetails(lastPathSegment)
      .then((res) => {
        console.log(res.data);
        const songUrlArray = res.data.songs.map((item, index) => {
          return {
            preview_url: item.url,
            name: item.name,
            album: { images: [{ url: item.image }], name: item.albumName },
            artists: item.artistsName,
          };
        });

        setUserAudioList(songUrlArray);
        setSonglists(res.data.songs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lastPathSegment]);
  return (
    <BodyContainer>
      <BodyInfo>
        <BodyInfoText>
          <strong>PLAYLIST</strong>
          <h2>{playlistName}</h2>
        </BodyInfoText>
      </BodyInfo>
      <BodySongs>
        <BodyIcons>
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </BodyIcons>

        {songlists?.map((item, inx) => (
          <SongRow
            audiolist={userAudioList}
            key={inx}
            url={item.url}
            time={item.time}
            image={item.image}
            name={item.name}
            albumName={item.albumName}
            artistsName={item.artistsName}
            spotify={spotify}
            isUserPlaylist={true}
          />
        ))}
      </BodySongs>
    </BodyContainer>
  );
}

export default Body;

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
  }
`;
// const Recommended = styled.div`
//   margin-top: 50px;
//   h3,
//   .recommend_p {
//     padding-left: 30px;
//   }
//   padding-top: 10px;
//   padding-bottom: 200px;
// `;
