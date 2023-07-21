import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategoriesDetail } from "../../features/spotifyDataSlice";
import Loading from "../shared/Loading";
import Post from "../shared/Post";

function SearchCategory({ spotify }) {
  const categoryDetail = useSelector(selectCategoriesDetail);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryDetail) {
      setLoading(false);
    }
  }, [categoryDetail]);
  return (
    <SearchCategoryContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HomeContentContainer>
            <h1>{categoryDetail?.name}</h1>
            <PostsContainer>
              {categoryDetail?.playListItem.map((track, inx) => (
                <Post
                  spotify={spotify}
                  playlistId={track.id}
                  key={inx}
                  image={track.images[0].url}
                  artistsName={track.name}
                  description={track.description}
                />
              ))}
            </PostsContainer>
          </HomeContentContainer>
        </>
      )}
    </SearchCategoryContainer>
  );
}

export default SearchCategory;
const SearchCategoryContainer = styled.div`
  padding-top: 80px;
  padding-left: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background-color: #121212;
`;
const HomeContentContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;

  > h1 {
    padding-bottom: 30px;
  }
  :last-child {
    padding-bottom: 150px;
  }
`;
const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
