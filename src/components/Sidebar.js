import React from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { Link } from "react-router-dom";
import {connect} from "dva";

function Sidebar({ spotify, playlists }) {
  return (
    <SidebarContainer>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <Link to="/" style={{ textDecoration: "none" }}>
        <SidebarOption title="Home" Icon={HomeIcon} />
      </Link>
      <Link to="/search" style={{ textDecoration: "none" }}>
        <SidebarOption title="Search" Icon={SearchIcon} />
      </Link>
      <Link to="/library" style={{ textDecoration: "none" }}>
        <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      </Link>
      <br />
      <strong>PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist, idx) => (
        <SidebarOption
          spotify={spotify}
          key={idx}
          id={playlist.id}
          title={playlist.name}
        />
      ))}
    </SidebarContainer>
  );
}

export default connect(({global}) => ({...global}))(Sidebar);

const SidebarContainer = styled.div`
  overflow-y: overlay;

  flex: 0.2;
  background-color: #040404;
  color: white;
  height: 100vh;
  min-width: 230px;
  padding-left: 10px;
  padding-right: 10px;
  > img {
    height: 70px;
    padding: 10px;
    margin-right: auto;
  }

  > strong {
    margin-left: 10px;
    padding: 5px;
    font-size: 12px;
  }
  > hr {
    border: 1px solid #282828;
    width: 90%;
    margin: 10px auto;
  }
`;
