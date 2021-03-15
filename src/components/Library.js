import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectList, selectPlaylists, selectUser } from "../features/userSlice";
import LibraryPost from "./LibraryPost";
import Post from "./Post";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

function Library({ spotify }) {
  const myList = useSelector(selectPlaylists);
  const user = useSelector(selectUser);

  return (
    <LibraryContainer>
      <h1>{`${user?.user.display_name}'s playlists`}</h1>
      <HomeContentContainer>
        <LikedContainer>
          <h1>Liked Songs</h1>

          <PlayCircleOutlineIcon className="icon" fontSize="large" />
        </LikedContainer>
        <PostsContainer>
          {myList?.playlists?.items?.map((playlist, idx) => (
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
      </HomeContentContainer>
    </LibraryContainer>
  );
}

export default Library;
const LibraryContainer = styled.div`
  padding-top: 80px;
  padding-left: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  overflow-y: overlay;
  background-color: #121212;
`;
const HomeContentContainer = styled.div`
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
`;
const LikedContainer = styled.div`
  width: 500px;
  height: 350px;

  background-image: linear-gradient(to left, #ffafbd, #ffc3a0);

  margin: 20px;
  position: relative;
  cursor: pointer;
  h1 {
    font-size: 40px;
    position: absolute;
    top: 250px;
    left: 30px;
  }
  .icon {
    font-size: 60px;
    position: absolute;
    top: 200px;
    left: 400px;
    color: lightgreen;
  }
`;
