import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategories } from "../../features/spotifyDataSlice";
import SearchCategoryPost from "./SearchCategoryPost";
import SearchHeader from "./SearchHeader";
import { spotifyContext } from "../Player";
import SearchDetail from "./SearchDetail";

function Search() {
  const { category } = useSelector(selectCategories);
  const spotify = useContext(spotifyContext);
  const [inputValue, setInputValue] = useState("");

  const [searchResult, setSearchResult] = useState(null);

  const searchOnChange = (e) => {
    setInputValue(e.target.value);
    setSearchResult(null);
  };

  const searchOnSubmit = async (e) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }
    try {
      const res = await spotify.search(inputValue, ["artist", "track"], {
        limit: 14,
      });
      setSearchResult(res);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader
        input={inputValue}
        searchOnSubmit={searchOnSubmit}
        searchOnChange={searchOnChange}
      />

      {!searchResult || !inputValue ? (
        <>
          <h3>Browse all</h3>
          <CategoryContainer>
            <CategoryContent>
              {category.categories.items.map((item, idx) => (
                <SearchCategoryPost
                  key={idx}
                  id={item.id}
                  image={item.icons[0].url}
                  name={item.name}
                />
              ))}
            </CategoryContent>
          </CategoryContainer>
        </>
      ) : (
        <SearchDetail searchResult={searchResult} />
      )}
    </SearchContainer>
  );
}

export default Search;

const SearchContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  margin-bottom: 75px;
  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CategoryContainer = styled.div`
  width: 100%;
`;
const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
