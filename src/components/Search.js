import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategories, selectSearchResult } from "../features/userSlice";
import Header from "./Header";
import SearchPost from "./SearchPost";
import SearchHeader from "./SearchHeader";
import SearchArtistPost from "./SearchArtistPost";
import SongRow from "./SongRow";
function Search({ spotify }) {
  const category = useSelector(selectCategories);
  const searchResult = useSelector(selectSearchResult);
  console.log(searchResult);

  return (
    <SearchContainer>
      <SearchHeader spotify={spotify} />
      {/* {searchResult && (
        <>
          <SearchresultContainer>
            <ResultLeft>
              <h3>Top result</h3>

              <PostContainer>
                <PostContent>
                  <img
                    src={
                      searchResult.searchResult.artists.items[0].images[0].url
                    }
                    alt=""
                  />
                  <h2>{searchResult.searchResult.artists.items[0].name}</h2>
                  <h3>Artist</h3>
                </PostContent>
              </PostContainer>
            </ResultLeft>
            <ResultRight>
              <h3>Songs</h3>
              <ResultRightSongcontainer>
                {searchResult?.searchResult.tracks.items.map((item, idx) => (
                  <SongRow
                    key={idx}
                    time={item.duration_ms}
                    image={item.album.images[0].url}
                    name={item.name}
                    albumName={item.album.name}
                    artistsName={item.artists}
                  />
                ))}
              </ResultRightSongcontainer>
            </ResultRight>
          </SearchresultContainer>

          <h3>Artist</h3>
          <Test>
            {searchResult?.searchResult.artists.items.map((item, idx) => (
              <SearchArtistPost
                key={idx}
                id={item.id}
                spotify={spotify}
                image={item.images[0]?.url}
                name={item.name}
              />
            ))}
          </Test>
        </>
      )} */}
      <h3>Browse all</h3>
      <CategoryContainer>
        <Test>
          {category?.category.categories?.items.map((item, idx) => (
            <SearchPost
              key={idx}
              id={item.id}
              spotify={spotify}
              image={item.icons[0].url}
              name={item.name}
            />
          ))}
        </Test>
      </CategoryContainer>
    </SearchContainer>
  );
}

export default Search;

const SearchContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;

  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CategoryContainer = styled.div`
  width: 100%;
`;
const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SearchresultContainer = styled.div`
  display: flex;
`;

const ResultLeft = styled.div`
  flex: 0.3;
`;
const ResultRight = styled.div`
  flex: 0.7;
`;
const PostContainer = styled.div`
  color: white;
  width: 430px;

  height: 300px;
  background-color: #181818;
  margin: 15px;
  border-radius: 20px;

  cursor: pointer;

  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 100px;
    border-radius: 999px;
  }
  h2 {
    font-size: 40px;
  }
`;
const ResultRightSongcontainer = styled.div`
  width: 100%;
  height: 300px;
  overflow-y: scroll;
`;
