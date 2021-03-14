import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { selectPlaylistid, selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { db } from "./firebase";
function Header({ spotify }) {
  const user = useSelector(selectUser);
  const playlistid = useSelector(selectPlaylistid);
  const { playlistid: id } = playlistid;
  console.log(id);
  const SignOut = () => {
    db.collection("tracks").doc("2dAHYaAxhP3AOQIQXwG1wD").delete();
    console.log("im working");
    // db.collection("displays").delete();
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <SearchIcon />
        <input
          placeholder="Search for Artists, Songs, or Podcasts "
          type="text"
        />
      </HeaderLeft>
      <HeaderRight>
        <Avatar src={user?.user.images[0]?.url} alt="user" />
        <h4>{user?.user.display_name}</h4>
        <hr />
        <button onClick={SignOut}>Sign out</button>
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const HeaderLeft = styled.div`
  flex: 0.5;
  min-width: 70px;
  background-color: white;
  color: gray;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  > input {
    border: none;
    width: 100%;
    outline-style: none;
  }
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    margin-left: 10px;
  }
`;
