import React, { useContext, useState } from "react";

import styled from "styled-components";
import SearchCategoryPost from "./SearchCategoryPost";
import SearchHeader from "./SearchHeader";
import SearchDetail from "./SearchDetail";
import { spotifyContext } from "App";
import { useAppSelector } from "app/hook";
import { SpotifyCategory } from "features/spotifyDataSlice";

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
export interface Itracks {
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
  tracks: Itracks[];
}

function Search() {
  const spotify = useContext(spotifyContext);
  const category = useAppSelector((state) => state.spotifyData.category);
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
      const res = await spotify.search(inputValue, ["artist", "track"], {
        limit: 14,
      });

      if (res.artists!.items.length !== 0) {
        const artistsArray = res.artists!.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.images[0]?.url,
            artistInfo: {
              name: item.name,
              image: item.images[0]?.url,
              followers: item.followers.total,
              genres: item.genres,
            },
          };
        });
        const artistsTracksArray = res
          .tracks!.items.filter((item) => !!item.preview_url)
          .map((item) => {
            return {
              url: item.preview_url,
              time: item.duration_ms,
              image: item.album.images[0].url,
              name: item.name,
              albumName: item.album.name,
              artistsName: item.artists,
            };
          });
        setSearchResult({
          topId: res.artists!.items[0].id,
          topName: res.artists!.items[0].name,
          topImage: res.artists!.items[0].images[0].url,
          topFollowers: res.artists!.items[0].followers.total,
          topGenres: res.artists!.items[0].genres,
          artists: artistsArray,
          tracks: artistsTracksArray,
        });
      } else {
        setSearchResult({
          topId: "",
          topName: "",
          topImage: "",
          topFollowers: 0,
          topGenres: [],
          artists: [],
          tracks: [],
        });
      }
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
          {!searchResult.topId && <h1>No result</h1>}
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
