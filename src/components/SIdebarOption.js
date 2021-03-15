import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  selectList,
  selectPlaylistid,
  set_list,
  set_playlistid,
  set_Recommended,
} from "../features/userSlice";
import { db } from "./firebase";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function SidebarOption({ title, Icon, id, spotify }) {
  const [tracksDetail] = useCollection(id && db.collection("tracks").doc(id));
  const [trackItem] = useCollection(
    id &&
      db
        .collection("tracks")
        .doc(id)
        .collection("track")
        .orderBy("timestamp", "asc")
  );
  const [displayDetail] = useCollection(
    id && db.collection("displays").doc(id)
  );
  
  const dispatch = useDispatch();
 
  
  const click = () => {
    dispatch(
      set_playlistid({
        playlistid: id,
      })
    );
    spotify.getPlaylist(id).then((res) => {
      dispatch(
        set_list({
          res,
        })
      );
      spotify
        .getRecommendations({
          seed_artists: res.tracks.items[0].track.artists[0].id,
          seed_tracks: id,
        })
        .then((recommended) => {
          dispatch(
            set_Recommended({
              recommended,
            })
          );
        });
    });
  };

  return (
    <>
      {id ? (
        <Link to={`/${id}`} onClick={click} style={{ textDecoration: "none" }}>
          <SidebarOptionContainer>
            {Icon && <Icon />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
          </SidebarOptionContainer>
        </Link>
      ) : (
        <SidebarOptionContainer>
          {Icon && <Icon />}
          {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </SidebarOptionContainer>
      )}
    </>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  color: gray;
  height: 40px;
  cursor: pointer;
  transition: 200ms color ease-in;
  display: flex;
  align-items: center;

  :hover {
    color: white;
  }
  > .MuiSvgIcon-root {
    padding-left: 10px;
    padding-right: 10px;
  }
  > p {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 14px;
  }
`;
