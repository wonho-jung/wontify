import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

function SearchHeader({ searchOnSubmit, searchOnChange, input }) {
  return (
    <SearchHeaderContainer>
      <SearchHeaderLeft>
        <SearchIcon />
        <form onSubmit={searchOnSubmit}>
          <input
            value={input}
            onChange={searchOnChange}
            placeholder="Search for Artists or Songs"
            type="text"
          />
        </form>
      </SearchHeaderLeft>
    </SearchHeaderContainer>
  );
}

export default SearchHeader;

const SearchHeaderContainer = styled.div`
  max-width: 700px;
  margin-bottom: 30px;
`;
const SearchHeaderLeft = styled.div`
  flex: 0.5;
  width: 100%;
  background-color: white;
  color: gray;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  > form {
    flex: 1;
  }
  > form > input {
    border: none;
    width: 100%;
    outline-style: none;
  }
`;
