import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategoriesDetail } from "../features/userSlice";
import Post from "./Post";

function SearchCategory({ spotify }) {
  const categoryDetail = useSelector(selectCategoriesDetail);
  console.log(categoryDetail);
  return (
    <div>
      {" "}
      <HomeContentContainer>
        <h1>{categoryDetail?.id}</h1>
        <PostsContainer>
          {categoryDetail?.categoriesDetail.playlists.items.map(
            (track, inx) => (
              <Post
                spotify={spotify}
                playlistId={track.id}
                key={inx}
                image={track.images[0].url}
                artistsName={track.name}
                description={track.description}
              />
            )
          )}
        </PostsContainer>
      </HomeContentContainer>
    </div>
  );
}

export default SearchCategory;
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
