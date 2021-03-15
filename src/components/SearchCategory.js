import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCategoriesDetail } from "../features/userSlice";

function SearchCategory() {
  const categoryDetail = useSelector(selectCategoriesDetail);
  console.log(categoryDetail);
  return (
    <div>
      {" "}
      <HomeContentContainer>
        <h1>{categoryDetail.id}</h1>
        <PostsContainer>
          {/* {recentlyPlayed?.recentlyPlayed?.map((track, inx) => (
            <Post
              spotify={spotify}
              albumId={track.track.album.id}
              key={inx}
              image={track.track.album.images[0].url}
              artistsName={track.track.artists[0].name}
              name={track.track.name}
            />
          ))} */}
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
