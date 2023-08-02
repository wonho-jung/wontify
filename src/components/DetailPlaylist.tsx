import React, { useState, useEffect } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import SongRow from "./shared/SongRow";
import LoadingScreen from "./shared/LoadingScreen";
import { getSpotifyPlaylist } from "utils/spotify";

interface IDetailPlaylists {
  image: string;
  name: string;
  description: string | null;
  tracks: {
    url: string;
    time: number;
    image: string;
    name: string;
    albumName: string;
    artistsName: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;

      type: string;
      uri: string;
    }[];
  }[];
}

function DetailPlaylist() {
  const [
    detailPlaylists,
    setDetailPlaylists,
  ] = useState<IDetailPlaylists | null>(null);

  const { playlistId } = useParams();

  const [isLoadData, setIsLoadData] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { image, name, description, tracks } = await getSpotifyPlaylist(
          playlistId as string
        );
        setDetailPlaylists({
          image,
          name,
          description,
          tracks,
        });
        setIsLoadData(true);
      } catch (err) {
        alert(err);
        navigate("/home");
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <DetailPlaylistContainer>
      {!isLoadData ? (
        <LoadingScreen />
      ) : (
        <>
          <DetailInfo>
            <img src={detailPlaylists!.image} alt="album" />
            <DetailInfoText>
              <strong>PLAYLIST</strong>
              <h2>{detailPlaylists!.name}</h2>
              <p>{detailPlaylists!.description}</p>
            </DetailInfoText>
          </DetailInfo>

          <DetailSongs>
            <DetailIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <FavoriteIcon fontSize="large" />
              <MoreHorizIcon />
            </DetailIcons>

            {detailPlaylists!.tracks.map((item, inx) => (
              <SongRow
                audioList={detailPlaylists!.tracks}
                url={item.url}
                key={inx}
                time={item.time}
                image={item.image}
                name={item.name}
                albumName={item.albumName}
                artistsName={item.artistsName}
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
