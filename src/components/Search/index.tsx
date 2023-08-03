import React, { useState } from "react";

import styled from "styled-components";
import SearchCategoryPost from "./SearchCategoryPost";
import SearchHeader from "./SearchHeader";
import SearchDetail from "./SearchDetail";
import { useAppSelector } from "app/hook";
import { SpotifyCategory } from "features/spotifyDataSlice";
import { getSearchResult } from "utils/spotify";

export interface IArtists {
  id: string;
  name: string;
  image: string;
  artistInfo: {
    name: string;
    image: string;
    followers: number;
    genres: string[];
  };
}
export interface ITracks {
  url: string;
  time: number;
  image: string;
  name: string;
  albumName: string;
  artistsName: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
}

export interface ISearchResult {
  topId: string;
  topName: string;
  topImage: string;
  topFollowers: number;
  topGenres: string[];
  artists: IArtists[];
  tracks: ITracks[];
}

function Search() {
  const category = useAppSelector(
    (state) => state.spotifyData.categories.data.categoriesData
  );
  const [inputValue, setInputValue] = useState("");

  const [searchResult, setSearchResult] = useState<null | ISearchResult>(null);

  const searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchResult(null);
  };

  const searchOnSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    }
    try {
      const {
        topId,
        topName,
        topImage,
        topFollowers,
        topGenres,
        searchResultArtists,
        searchResultTracks,
      } = await getSearchResult(inputValue);

      setSearchResult({
        topId,
        topName,
        topImage,
        topFollowers,
        topGenres,
        artists: searchResultArtists,
        tracks: searchResultTracks,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader
        input={inputValue}
        searchOnSubmit={searchOnSubmit}
        searchOnChange={searchOnChange}
      />

      {!inputValue || !searchResult ? (
        <>
          <h3>Browse all</h3>
          <CategoryContainer>
            <CategoryContent>
              {category &&
                category!.map((item: SpotifyCategory, idx: number) => (
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
        <>
          {searchResult.artists.length === 0 && <h1>No result</h1>}
          {searchResult && searchResult.artists.length !== 0 && (
            <SearchDetail searchResult={searchResult} />
          )}
        </>
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
