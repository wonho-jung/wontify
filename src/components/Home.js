import React from "react";
import styled from "styled-components";
import Post from "./Post";
import { selectNewReleases, selectRecentlyPlayed } from "../features/userSlice";
import { useSelector } from "react-redux";
function Home() {
  const played = useSelector(selectRecentlyPlayed);
  const {
    recentlyPlayed: { items: playedRecently },
  } = played;

  const newReleases = useSelector(selectNewReleases);
  const {
    newReleases: {
      albums: { items: newSong },
    },
  } = newReleases;
  console.log(newSong);

  return (
    <HomeContainer>
      <HomeContentContainer>
        <h1>Recently played</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post
              key={track.track.id}
              image={track.track.album.images[0].url}
              artistsName={track.track.artists.name}
              name={track.track.name}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>New Releases</h1>
        <PostsContainer>
          {newSong.map((track) => (
            <Post
              key={track.id}
              image={track.images[0].url}
              artistsName={track.artists[0].name}
              name={track.name}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
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
`;
const PostsContainer = styled.div`
  display: flex;
`;
