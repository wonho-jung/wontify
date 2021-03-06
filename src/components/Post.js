import React from "react";
import styled from "styled-components";

function Post({ recentlyPlayed }) {
  return (
    <PostContainer>
      <PostContent>
        <img src={recentlyPlayed.track.album.images[0].url} alt="" />
        <h4>{recentlyPlayed.track.artists[0].name}</h4>
        <p>{recentlyPlayed.track.name}</p>
      </PostContent>
    </PostContainer>
  );
}

export default Post;
const PostContainer = styled.div`
  max-width: 220px;
  background-color: #181818;
  margin: 10px;
`;
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 180px;
  }
`;
