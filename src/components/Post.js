import React from "react";
import styled from "styled-components";

function Post({ image, name, artistsName, description }) {
  return (
    <PostContainer>
      <PostContent>
        <img src={image} alt="" />
        <h4>{artistsName}</h4>
        <p>{name && name}</p>
        <p>{description && description}</p>
      </PostContent>
    </PostContainer>
  );
}

export default Post;
const PostContainer = styled.div`
  max-width: 180px;
  background-color: #181818;
  margin: 10px;
`;
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 140px;
  }
`;
