import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "../shared/SongRow";
import { Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hook";
import LoadingScreen from "components/shared/LoadingScreen";
import { fetchArtistDetails } from "features/spotifyDataSlice";
function Artist() {
  const navigate = useNavigate();
  const { status, artist } = useAppSelector(
    (state) => state.spotifyData.artistDetail
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [followNumber, setFollowNumber] = useState<null | number>(null);
  const [btnText, setBtnText] = useState("Follow");

  //Load data when component mounts
  useEffect(() => {
    dispatch(fetchArtistDetails(id as string));
  }, [dispatch, id]);
  //Check if there is no data, go back to search page
  useEffect(() => {
    if (status === "failed") {
      alert("Failed to load artist");
      navigate("/search");
    }
  }, [status, navigate]);

  //Set follow number when artist info is loaded
  useEffect(() => {
    if (!!artist.info) {
      setFollowNumber(artist.info!.followers);
    }
    return () => {
      setFollowNumber(null);
    };
  }, [artist.info]);

  const followOnClickHandler = () => {
    if (btnText === "Follow") {
      setFollowNumber(artist.info!.followers + 1);
      setBtnText("Followed");
    } else {
      setFollowNumber(artist.info!.followers);
      setBtnText("Follow");
    }
  };

  return (
    <ArtistContainer>
      {status === "loading" && <LoadingScreen />}
      {status === "succeeded" && (
        <>
          <ArtistInfo>
            <img src={artist.info!.image} alt="" />
            <ArtistInfoText>
              <strong>ARTIST</strong>

              <h1>{artist.info!.name}</h1>

              {artist.info!.genres.length > 0 && (
                <p>
                  Genres:{" "}
                  {artist.info!.genres.map((genre: string) => genre).join(", ")}
                </p>
              )}
              <p>Follower: {followNumber}</p>
            </ArtistInfoText>
          </ArtistInfo>

          <ArtistSongs>
            <ArtistIcons>
              <PlayCircleFilledIcon className="Artist__shuffle" />
              <Button onClick={followOnClickHandler}>{btnText}</Button>
              <MoreHorizIcon />
            </ArtistIcons>
            <h1>Popular Top 10</h1>
            {artist.tracks!.map((item, inx) => (
              <SongRow
                key={inx}
                audioList={artist.tracks!}
                url={item.url}
                time={item.time}
                image={item.image}
                name={item.name}
                albumName={item.albumName}
                artistsName={item.artistsName}
              />
            ))}
          </ArtistSongs>
        </>
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
