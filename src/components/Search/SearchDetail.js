import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { set_artistDetail } from "../../features/spotifyDataSlice";
import SearchArtistPost from "./SearchArtistPost";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SongRow from "../shared/SongRow";
import { spotifyContext } from "../Player";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchDetail({ searchResult }) {
  const spotify = useContext(spotifyContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const getArtistTracks = async () => {
    try {
      const res = await spotify.getArtistTopTracks(
        searchResult.artists.items[0].id,
        "CA"
      );
      dispatch(
        set_artistDetail({
          artistDetail: res,
          artistInfo: searchResult?.artists.items[0],
        })
      );
      history.push(`/artist/${searchResult.artists.items[0].id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SearchResultContainer>
      {!!searchResult && searchResult.artists.items.length > 0 ? (
        <>
          <TopResultBox>
            <ResultLeft>
              <h3>Top result</h3>

              <PostContainer>
                <PostContent onClick={getArtistTracks}>
                  <img
                    src={searchResult.artists?.items[0].images[0].url}
                    alt=""
                  />
                  <h2>{searchResult.artists?.items[0].name}</h2>
                  <h3>Artist</h3>
                  <PlayCircleOutlineIcon className="icon" fontSize="large" />
                </PostContent>
              </PostContainer>
            </ResultLeft>
            <ResultRight>
              <h3>Songs</h3>
              <ResultSongsContainer>
                {searchResult?.tracks.items
                  .filter((url) => url.preview_url !== null)
                  .map((item, idx) => (
                    <SongRow
                      audioList={searchResult.tracks.items}
                      url={item.preview_url}
                      key={idx}
                      time={item.duration_ms}
                      image={item.album.images[0].url}
                      name={item.name}
                      albumName={item.album.name}
                      artistsName={item.artists}
                    />
                  ))}
              </ResultSongsContainer>
            </ResultRight>
          </TopResultBox>

          <h3>Artist</h3>
          <Test>
            {searchResult?.artists.items.map((item, idx) => (
              <SearchArtistPost
                key={idx}
                id={item.id}
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
