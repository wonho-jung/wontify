import React, { useState, useEffect, useContext } from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import SongRow from "./shared/SongRow";
import { spotifyContext } from "App";
import LoadingScreen from "./shared/LoadingScreen";

interface IdetailPlaylists {
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
  const spotify = useContext(spotifyContext);
  const [
    detailPlaylists,
    setDetailPlaylists,
  ] = useState<IdetailPlaylists | null>(null);

  const playlistId = window.location?.href.split("/")[4];

  const [isLoadData, setIsLoadData] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await spotify.getPlaylist(playlistId);

        //Fix error TS2339: Property 'preview_url' does not exist on type 'TrackObjectFull | EpisodeObjectFull'.
        //'TrackObjectFull | EpisodeObjectFull' does not contain the property 'preview_url' but it does exist.
        const filteredTracks = res.tracks.items.map((item: any) => {
          return {
            url: item.track.preview_url,
            name: item.track.name,
            time: item.track.duration_ms,
            image: item.track.album.images[0].url,
            albumName: item.track.album.name,
            artistsName: item.track.artists,
          };
        });

        setDetailPlaylists({
          image: res.images[0].url,
          name: res.name,
          description: res.description,
          tracks: filteredTracks,
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
