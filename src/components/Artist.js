import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectArtistDetail } from "../features/userSlice";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import { Button } from "@material-ui/core";
import SearchHeader from "./SearchHeader";
function Artist({ spotify }) {
  const artistDetail = useSelector(selectArtistDetail);
  console.log(artistDetail);
  const [followNumber, setFollowNumber] = useState("");
  const [btntext, setBtntext] = useState("Follow");
  useEffect(() => {
    if (artistDetail) {
      setFollowNumber(artistDetail.artistInfo.followers.total);
    }
  }, [artistDetail]);

  const followArtist = () => {
    if (btntext === "Follow") {
      setFollowNumber(artistDetail.artistInfo.followers.total + 1);

      setBtntext("Followed");
    } else {
      setFollowNumber(artistDetail.artistInfo.followers.total);

      setBtntext("Follow");
    }
  };
  return (
    <BodyContainer>
      <SearchHeader spotify={spotify} />
      {artistDetail?.artistInfo.images[0]?.url &&
      artistDetail?.artistInfo.name &&
      artistDetail?.artistInfo.genres &&
      followNumber ? (
        <>
          <BodyInfo>
            <img src={artistDetail?.artistInfo.images[0]?.url} alt="" />
            <BodyInfoText>
              <strong>ARTIST</strong>

              <h2>{artistDetail?.artistInfo.name}</h2>

              {artistDetail?.artistInfo.genres && (
                <p>
                  Genres:{" "}
                  {artistDetail?.artistInfo.genres
                    .map((genre) => genre)
                    .join(", ")}
                </p>
              )}
              <p>Follower: {followNumber}</p>
            </BodyInfoText>
          </BodyInfo>

          <BodySongs>
            <BodyIcons>
              <PlayCircleFilledIcon className="body__shuffle" />
              <Button onClick={followArtist}>{btntext}</Button>
              <MoreHorizIcon />
            </BodyIcons>
            <h1 className="bodySongTitle">Popular Top 10</h1>
            {artistDetail?.artistDetail.tracks.map((item, inx) => (
              <SongRow
                key={inx}
                time={item.duration_ms}
                image={item.album?.images[0].url}
                name={item.name}
                albumName={item.album.name}
                artistsName={item.artists}
              />
            ))}
          </BodySongs>
        </>
      ) : (
        <h1 style={{ fontSize: "30px" }}>No data sorry :( go back to Search</h1>
      )}
    </BodyContainer>
  );
}

export default Artist;
const BodyContainer = styled.div`
  padding: 30px;
  padding-bottom: 70px;
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
    border-radius: 999px;
    height: 30vw;
    margin: 0 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;
const BodyInfoText = styled.div`
  flex: 1;
  > h2 {
    font-size: 150px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 16px;
    font-weight: 200;
  }
`;

const BodySongs = styled.div`
  margin: 20px -30px;
  .bodySongTitle {
    margin-left: 30px;
  }
`;
const BodyIcons = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 20px;
    border: 1px solid gray;
    padding: 10px;
    color: white;
    :hover {
      border: 1.5px solid white;
    }
  }
  > .MuiSvgIcon-root {
    margin-right: 20px;
  }
  > .body__shuffle {
    font-size: 80px !important;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    :hover {
      transition: 100ms transform ease-in;
      transform: scale(1.08);
    }
  }
`;
