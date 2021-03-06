import React from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useSelector } from "react-redux";
import { selectPlaylists } from "../features/userSlice";
import { Link } from "react-router-dom";
function Sidebar() {
  const myList = useSelector(selectPlaylists);
  console.log(myList);

  return (
    <SidebarContainer>
      <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" />
      <Link to="/home" style={{ textDecoration: "none" }}>
        <SidebarOption title="Home" Icon={HomeIcon} />
      </Link>
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong>PLAYLISTS</strong>
      <hr />
      {myList?.playlists?.items?.map((playlist) => (
        <SidebarOption title={playlist.name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.2;
  height: 100vh;
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
