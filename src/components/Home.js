import React from "react";
import styled from "styled-components";
import Post from "./Post";
import { selectRecentlyPlayed } from "../features/userSlice";
import { useSelector } from "react-redux";
function Home() {
  const played = useSelector(selectRecentlyPlayed);
  const {
    recentlyPlayed: { items: playedRecently },
  } = played;
  console.log(playedRecently);
  return (
    <HomeContainer>
      <HomeContentContainer>
        <h1>Recently played</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post key={track.id} recentlyPlayed={track} />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>The Top Podcasts of 2020</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post key={track.id} recentlyPlayed={track} />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>Mood</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post key={track.id} recentlyPlayed={track} />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>The Top Podcasts of 2020</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post key={track.id} recentlyPlayed={track} />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>The Top Podcasts of 2020</h1>
        <PostsContainer>
          {playedRecently.map((track) => (
            <Post key={track.id} recentlyPlayed={track} />
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
