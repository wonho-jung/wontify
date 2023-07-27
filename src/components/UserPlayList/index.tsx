import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { selectPlaylists } from "../../features/userPlaylistSlice";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../shared/SongRow";
import { getPlaylistDetails } from "../../backend";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "app/hook";

function UserPlayList() {
  const [songLists, setSongLists] = useState([]);
  const [userAudioList, setUserAudioList] = useState([]);
  const playlists = useAppSelector(selectPlaylists);
  const location = useLocation();
  const currentPath = location.pathname;
  const lastPathSegment = currentPath.substring(
    currentPath.lastIndexOf("/") + 1
  );
  const playlistName = playlists?.find((item) => item._id === lastPathSegment)
    ?.name;

  const removeSongListById = (id: string) => {
    const newSongLists = songLists.filter((item: any) => item.id !== id);
    setSongLists([...newSongLists]);
  };

  useEffect(() => {
    getPlaylistDetails(lastPathSegment)
      .then((res) => {
        if (!res.data.songs) {
          setSongLists([]);
          setUserAudioList([]);
          return;
        }
        const songUrlArray = res.data?.songs.map((item: any, index: number) => {
          return {
            preview_url: item.url,
            name: item.name,
            album: { images: [{ url: item.image }], name: item.albumName },
            artists: item.artistsName,
          };
        });
        setUserAudioList(songUrlArray);
        setSongLists(res.data.songs);
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

        {songLists?.map((item: any, inx) => (
          <SongRow
            removeSongListById={removeSongListById}
            id={item.id}
            audioList={userAudioList}
            key={inx}
            url={item.url}
            time={item.time}
            image={item.image}
            name={item.name}
            albumName={item.albumName}
            artistsName={item.artistsName}
            isUserPlaylist={true}
          />
        ))}
      </BodySongs>
    </BodyContainer>
  );
}

export default UserPlayList;

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
