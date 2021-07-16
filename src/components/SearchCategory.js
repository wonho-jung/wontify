import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import Post from "./Post";
import {connect} from "dva";

function SearchCategory({ spotify, categoryDetail }) {
  const [loading, setLoading] = useState("true");

  useEffect(() => {
    if (
      categoryDetail &&
      categoryDetail?.id === window.location.href.split("/")[4]
    ) {
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
            <h1>{categoryDetail?.id}</h1>
            <PostsContainer>
              {categoryDetail?.playlists.items.map(
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
        </>
      )}
    </SearchCategoryContainer>
  );
}

export default connect(({global}) => ({...global}))(SearchCategory);
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
