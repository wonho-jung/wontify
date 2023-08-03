import React from "react";
import styled from "styled-components";
import SearchArtistPost from "./SearchArtistPost";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SongRow from "../shared/SongRow";

import { ISearchResult } from "./index";
import { Link } from "react-router-dom";

function SearchDetail({ searchResult }: { searchResult: ISearchResult }) {
  return (
    <SearchResultContainer>
      <TopResultBox>
        <ResultLeft>
          <h3>Top result</h3>
          <Link to={`/artist/${searchResult.topId}`}>
            <PostContainer>
              <PostContent>
                <img src={searchResult.topImage} alt="" />
                <h2>{searchResult.topName}</h2>
                <h3>Artist</h3>
                <PlayCircleOutlineIcon className="icon" fontSize="large" />
              </PostContent>
            </PostContainer>
          </Link>
        </ResultLeft>
        <ResultRight>
          <h3>Songs</h3>
          <ResultSongsContainer>
            {searchResult?.tracks.map((item, idx) => (
              <SongRow
                key={idx}
                audioList={searchResult.tracks}
                url={item.url}
                time={item.time}
                image={item.image}
                name={item.name}
                albumName={item.albumName}
                artistsName={item.artistsName}
              />
            ))}
          </ResultSongsContainer>
        </ResultRight>
      </TopResultBox>

      <h3>Artist</h3>
      <Test>
        {searchResult.artists.map((item, idx) => (
          <SearchArtistPost
            key={idx}
            id={item.id}
            image={item.image}
            name={item.name}
          />
        ))}
      </Test>
    </SearchResultContainer>
  );
}

export default SearchDetail;
const SearchResultContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  padding-bottom: 75px;
  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Test = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const TopResultBox = styled.div`
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
  position: relative;
  height: 300px;
  background-color: #181818;
  margin: 15px;
  border-radius: 20px;
  cursor: pointer;
  opacity: 0.7;

  .icon {
    font-size: 60px;
    position: absolute;
    color: lightGreen;
    top: 150px;
    left: 300px;
    display: none;
  }
  :hover {
    opacity: 1;
    .icon {
      display: block;
    }
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
const ResultSongsContainer = styled.div`
  margin-top: 15px;
  border-radius: 20px;
  width: 95%;
  height: 300px;
  overflow-y: scroll;
  background-color: #181818;
`;
