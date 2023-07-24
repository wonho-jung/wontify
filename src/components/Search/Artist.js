import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectArtistDetail } from "../../features/spotifyDataSlice";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../shared/SongRow";
import { Button } from "@material-ui/core";
import SearchHeader from "./SearchHeader";
function Artist({ spotify }) {
  const artistDetail = useSelector(selectArtistDetail);
  const [followNumber, setFollowNumber] = useState("");
  const [btnText, setBtnText] = useState("Follow");
  useEffect(() => {
    if (artistDetail) {
      setFollowNumber(artistDetail.artistInfo.followers.total);
    }
  }, [artistDetail]);

  const followArtist = () => {
    if (btnText === "Follow") {
      setFollowNumber(artistDetail.artistInfo.followers.total + 1);

      setBtnText("Followed");
    } else {
      setFollowNumber(artistDetail.artistInfo.followers.total);

      setBtnText("Follow");
    }
  };
  return (
    <ArtistContainer>
      <SearchHeader spotify={spotify} />
      {artistDetail?.artistInfo.images[0]?.url &&
      artistDetail?.artistInfo.name &&
      artistDetail?.artistInfo.genres &&
      followNumber ? (
        <>
          <ArtistInfo>
            <img src={artistDetail?.artistInfo.images[0]?.url} alt="" />
            <ArtistInfoText>
              <strong>ARTIST</strong>


              <h1>{artistDetail?.artistInfo.name}</h1>


              {artistDetail?.artistInfo.genres && (
                <p>
                  Genres:{" "}
                  {artistDetail?.artistInfo.genres
                    .map((genre) => genre)
                    .join(", ")}
                </p>
              )}
              <p>Follower: {followNumber}</p>
            </ArtistInfoText>
          </ArtistInfo>

          <ArtistSongs>
            <ArtistIcons>
              <PlayCircleFilledIcon className="Artist__shuffle" />
              <Button onClick={followArtist}>{btnText}</Button>
              <MoreHorizIcon />
            </ArtistIcons>
            <h1>Popular Top 10</h1>

            {artistDetail?.artistDetail.tracks.map((item, inx) => (
              <SongRow
                audioList={artistDetail.artistDetail.tracks}
                url={item.preview_url}
                key={inx}
                time={item.duration_ms}
                image={item.album?.images[0].url}
                name={item.name}
                albumName={item.album.name}
                artistsName={item.artists}
              />
            ))}
          </ArtistSongs>
        </>
      ) : (
        <h1 style={{ fontSize: "30px" }}>No data.. Go back to Search</h1>
      )}
    </ArtistContainer>
  );
}

export default Artist;
const ArtistContainer = styled.div`
  padding: 30px;
  padding-bottom: 70px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background: linear-gradient(#ed4264, #ffedbc);
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ArtistInfo = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  > img {
    border-radius: 999px;
    height: 30vw;
    margin: 0 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;
const ArtistInfoText = styled.div`
  flex: 1;
  > h1 {
    font-size: 70px;

    margin-bottom: 10px;
  }
  > p {
    font-size: 16px;
    font-weight: 200;
  }
`;

const ArtistSongs = styled.div`
  margin: 20px, -30px;
  .h1 {
    margin-left: 30px;
  }
`;
const ArtistIcons = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 20px;
    border: 1px solid white;
    padding: 10px;
    color: white;
    :hover {
      border: 1px solid green;

    }
  }
  > .MuiSvgIcon-root {
    margin-right: 20px;
  }
  > .Artist__shuffle {
    font-size: 80px !important;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
