import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectSearchResult, set_artistDetail } from "../features/userSlice";
import SearchHeader from "./SearchHeader";
import SearchArtistPost from "./SearchArtistPost";
import SongRow from "./SongRow";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link } from "react-router-dom";

function SearchDetail({ spotify }) {
  const dispatch = useDispatch();
  const searchResult = useSelector(selectSearchResult);
  console.log(searchResult);
  const sendArtist = () => {
    spotify
      .getArtistTopTracks(searchResult.searchResult.artists.items[0].id, "CA")
      .then((res) => {
        dispatch(
          set_artistDetail({
            artistDetail: res,
            artistInfo: searchResult.searchResult.artists.items[0],
          })
        );
      });
  };
  return (
    <SearchResultContainer>
      <SearchHeader spotify={spotify} />

      {searchResult && searchResult.searchResult?.artists.items.length > 0 ? (
        <>
          <SearchresultContainer>
            <ResultLeft>
              <h3>Top result</h3>
              <Link
                to={`/artist/${searchResult.searchResult?.artists.items[0].id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <PostContainer onClick={sendArtist}>
                  <PostContent>
                    <img
                      src={
                        searchResult.searchResult.artists?.items[0].images[0]
                          .url
                      }
                      alt=""
                    />
                    <h2>{searchResult.searchResult.artists?.items[0].name}</h2>
                    <h3>Artist</h3>
                    <PlayCircleOutlineIcon className="icon" fontSize="large" />
                  </PostContent>
                </PostContainer>
              </Link>
            </ResultLeft>
            <ResultRight>
              <h3>Songs</h3>
              <ResultRightSongcontainer>
                {searchResult?.searchResult.tracks.items
                  .filter((url) => url.preview_url !== null)
                  .map((item, idx) => (
                    <SongRow
                      audiolist={searchResult.searchResult.tracks.items}
                      url={item.preview_url}
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
                artistInfo={item}
              />
            ))}
          </Test>
        </>
      ) : (
        <h1>No search result!!</h1>
      )}
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
    color: lightgreen;
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
const ResultRightSongcontainer = styled.div`
  margin-top: 15px;
  border-radius: 20px;
  width: 95%;
  height: 300px;
  overflow-y: scroll;
  background-color: #181818;
`;
