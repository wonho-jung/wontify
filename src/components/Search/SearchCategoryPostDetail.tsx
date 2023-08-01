import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchCategoryPlaylists } from "../../features/spotifyDataSlice";
import Post from "../shared/Post";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hook";
import LoadingScreen from "components/shared/LoadingScreen";

function SearchCategoryPostDetail() {
  const dispatch = useAppDispatch();
  const { status, playlistItems } = useAppSelector(
    (state) => state.spotifyData.categoriesByName
  );
  const categories = useAppSelector(
    (state) => state.spotifyData.categories.data.categoriesData
  );
  const { id } = useParams();
  const categoryTitle = categories!.find((category) => category.id === id);
  const navigate = useNavigate();

  //Load data when component mounts
  useEffect(() => {
    dispatch(fetchCategoryPlaylists(id as string));
  }, [dispatch, id]);
  //Check if there is no data, go back to search page
  useEffect(() => {
    if (status === "failed") {
      alert("Failed to load category");
      navigate("/search");
    }
  }, [status, navigate]);

  return (
    <SearchCategoryContainer>
      {status === "loading" && <LoadingScreen />}
      {status === "succeeded" && (
        <HomeContentContainer>
          {playlistItems && (
            <>
              <h1>{categoryTitle?.name}</h1>
              <PostsContainer>
                {playlistItems.length > 0 &&
                  playlistItems.map((track, inx) => (
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
      )}
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
