import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {connect} from "dva";

function SidebarOption({ title, Icon, id, spotify, dispatch }) {

  const click = () => {
    dispatch({
        type: 'global/save',
        payload: {
            playlistid: id,
        }
    });
    spotify
      .getPlaylist(id)
      .then((res) => {
        dispatch({
            type: 'global/save',
            payload: {
                userplaylist: res
            }
        });
        spotify
          .getRecommendations({
            seed_artists: res.tracks.items[0].track.artists[0].id,
            seed_tracks: id,
            limit: 10,
          })
          .then((recommended) => {
            dispatch({
                type: 'global/save',
                payload: {
                    recommended
                }
            });
          });
      })
      .catch((err) => {
        alert(err.message);
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

export default connect(({}) => ({}))(SidebarOption);

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
