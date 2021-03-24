import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectList,
  selectPlaylistid,
  selectRecommended,
} from "../features/userSlice";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import { db } from "./firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function Body({ spotify }) {
  const dispatch = useDispatch();
  const playlistid = useSelector(selectPlaylistid);
  const { playlistid: id } = playlistid;
  const userplaylist = useSelector(selectList);
  const recommended = useSelector(selectRecommended);

  const [tracksDetail] = useCollection(id && db.collection("tracks").doc(id));
  const [trackItem] = useCollection(
    id &&
      db
        .collection("tracks")
        .doc(id)
        .collection("track")
        .orderBy("timestamp", "asc")
  );

  return (
    <BodyContainer>
      <Header spotify={spotify} />

      <BodyInfo>
        <img src={userplaylist?.res.images[0].url} alt="" />
        <BodyInfoText>
          <strong>PLAYLIST</strong>
          <h2>{userplaylist?.res.name}</h2>
          <p>{userplaylist?.res.description}</p>
        </BodyInfoText>
      </BodyInfo>

      <BodySongs>
        <BodyIcons>
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </BodyIcons>

        {userplaylist?.res.tracks.items.map((item, inx) => (
          <SongRow
            trackInfo={item.track}
            key={inx}
            url={item.track.preview_url}
            time={item.track.duration_ms}
            image={item.track.album?.images[0]?.url}
            name={item.track.name}
            albumName={item.track.album.name}
            artistsName={item.track.artists}
            spotify={spotify}
          />
        ))}

        {tracksDetail &&
          trackItem?.docs.map((doc) => {
            const { albumName, artistsName, image, name, time } = doc.data();

            return (
              <SongRow
                albumName={albumName}
                artistsName={artistsName}
                image={image}
                name={name}
                time={time}
              />
            );
          })}

        <Recommended>
          <h3>Recommended</h3>
          <p className="recommend_p">Based on what's in this playlist</p>
          {recommended?.recommended.tracks.map((item) => (
            <SongRow
              id={id}
              track={item}
              spotify={spotify}
              image={item.album.images[0]?.url}
              name={item.name}
              albumName={item.album.name}
              artistsName={item.artists}
              timeRecommend={item.duration_ms}
              recommended
            />
          ))}
        </Recommended>
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
    :hover {
      transition: 100ms transform ease-in;
      transform: scale(1.08);
    }
  }
`;
const Recommended = styled.div`
  margin-top: 50px;
  h3,
  .recommend_p {
    padding-left: 30px;
  }
  padding-top: 10px;
  padding-bottom: 200px;
`;
