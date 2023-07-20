import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { set_searchResult } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
function SearchHeader({ spotify }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const SearchItem = (e) => {
    e.preventDefault();
    if (input !== "") {
      history.push("/search/search/song");

      spotify
        .search(input, ["artist", "track"], { limit: 14 })
        .then((res) => {
          dispatch(
            set_searchResult({
              searchResult: res,
            })
          );
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    setInput("");
  };

  return (
    <SearchHeaderContainer>
      <SearchHeaderLeft>
        <SearchIcon />

        <form onSubmit={SearchItem}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for Artists or Songs"
            type="text"
          />
        </form>
      </SearchHeaderLeft>
      {/* <SearchHeaderRight>
        <Avatar src={user?.user.images[0]?.url} alt="user" />
        <h4>{user?.user.display_name}</h4>
        <hr />
      </SearchHeaderRight> */}
    </SearchHeaderContainer>
  );
}

export default SearchHeader;

const SearchHeaderContainer = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const SearchHeaderLeft = styled.div`
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
// const SearchHeaderRight = styled.div`
//   display: flex;
//   align-items: center;
//   > h4 {
//     margin-left: 10px;
//   }
// `;
