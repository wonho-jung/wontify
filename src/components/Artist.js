import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectArtistDetail } from "../features/userSlice";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import { Button } from "@material-ui/core";
import SearchHeader from "./SearchHeader";
//it's better to have an empty line after imports

function Artist({ spotify }) {
  const artistDetail = useSelector(selectArtistDetail);
  const [followNumber, setFollowNumber] = useState("");
  const [btntext, setBtntext] = useState("Follow");

  // you should delete console logs 
  console.log(artistDetail); 

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
    // JSX looks a bit complicated, I would separate it to different components
    <ArtistContainer>
      <SearchHeader spotify={spotify} />
      {/* It's better to have some variable like hasLoadedArtist, that's hard to read 
          Also, you can place it separately, like image && <img> and so on */}
      {artistDetail?.artistInfo.images[0]?.url &&
      artistDetail?.artistInfo.name &&
      artistDetail?.artistInfo.genres &&
      followNumber ? (
        <>
          <ArtistInfo>
            <img src={artistDetail?.artistInfo.images[0]?.url} alt="" />
            <ArtistInfoText>
              <strong>ARTIST</strong>

              {/* What if artistDetail = undefined? you'll have an empty tag, which is not good
              to be safe you can do this artistDetail?.artistInfo.name || "" */}
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
            </ArtistInfoText>
          </ArtistInfo>

          <ArtistSongs>
            <ArtistIcons>
              {/* Do you have both styled components and css? It's better to choose one */}
              <PlayCircleFilledIcon className="Artist__shuffle" />
              <Button onClick={followArtist}>{btntext}</Button>
              <MoreHorizIcon />
            </ArtistIcons>
            <h1 className="artistTitle">Popular Top 10</h1>
            {artistDetail?.artistDetail.tracks.map((item, inx) => (
              <SongRow
                audiolist={artistDetail.artistDetail.tracks}
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
        <h1 style={{ fontSize: "30px" }}>No data sorry :( go back to Search</h1>
      )}
    </ArtistContainer>
  );
}

export default Artist;

// It's better to move style-related code in separate files
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
  > h2 {
    font-size: 150px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 16px;
    font-weight: 200;
  }
`;

const ArtistSongs = styled.div`
  margin: 20px -30px;
  .artistTitle {
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
      border: 3px solid green;
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
