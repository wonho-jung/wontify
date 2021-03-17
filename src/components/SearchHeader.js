import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import {
  selectPlaylistid,
  selectUser,
  set_searchResult,
} from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "./firebase";
import { Link, useHistory } from "react-router-dom";
function SearchHeader({ spotify }) {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const SearchItem = (e) => {
    e.preventDefault();
    history.push("/search/search/song");
    if (input !== "") {
      spotify.search(input, ["artist", "track"], { limit: 14 }).then((res) => {
        dispatch(
          set_searchResult({
            searchResult: res,
          })
        );
      });
    }

    setInput("");
  };

  console.log(input);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <SearchIcon />

        <form onSubmit={SearchItem}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for Artists or Songs"
            type="text"
          />
        </form>
      </HeaderLeft>
      <HeaderRight>
        <Avatar src={user?.user.images[0]?.url} alt="user" />
        <h4>{user?.user.display_name}</h4>
        <hr />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default SearchHeader;

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
  > form > input {
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
