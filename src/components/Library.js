import React from "react";
import styled from "styled-components";
import LibraryPost from "./LibraryPost";
import {connect} from "dva";

function Library({ spotify, user, playlists }) {

  return (
    <LibraryContainer>
      <h1>{`${user?.display_name}'s playlists`}</h1>
      <LibraryContentContainer>
        <PostsContainer>
          {playlists?.items?.map((playlist, idx) => (
            <LibraryPost
              image={playlist.images[0].url}
              spotify={spotify}
              key={idx}
              id={playlist.id}
              name={playlist.name}
              description={playlist.description}
            />
          ))}
        </PostsContainer>
      </LibraryContentContainer>
    </LibraryContainer>
  );
}

export default connect(({global}) => ({...global}))(Library);
const LibraryContainer = styled.div`
  padding-top: 80px;
  padding-left: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background-color: #121212;
`;
const LibraryContentContainer = styled.div`
  display: flex;
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
