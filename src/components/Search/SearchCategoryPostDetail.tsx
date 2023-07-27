import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategoriesDetail } from "../../features/spotifyDataSlice";
import Post from "../shared/Post";
import { useNavigate } from "react-router-dom";

function SearchCategoryPostDetail() {
  const categoryDetail = useSelector(selectCategoriesDetail);
  const navigate = useNavigate();

  useEffect(() => {
    //If user refresh the page, categoryDetail will be null. So, redirect to search page.
    if (!categoryDetail) {
      navigate(`/search`);
    }
  }, [categoryDetail, navigate]);

  return (
    <SearchCategoryContainer>
      <HomeContentContainer>
        {categoryDetail && (
          <>
            <h1>{categoryDetail!.name}</h1>
            <PostsContainer>
              {categoryDetail!.playlistItems.map((track, inx) => (
                <Post
                  key={inx}
                  playlistId={track.id}
                  image={track.image}
                  artistsName={track.name}
                  description={track.description}
                />
              ))}
            </PostsContainer>
          </>
        )}
      </HomeContentContainer>
    </SearchCategoryContainer>
  );
}

export default SearchCategoryPostDetail;
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
