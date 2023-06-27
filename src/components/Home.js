import React from "react";
import styled from "styled-components";
import Post from "./Post";
import {
  selectMood,
  selectNewReleases,
  selectParty,
  // selectRecentlyPlayed,
  selectTopList,
  selectWorkout,
} from "../features/userSlice";
import { useSelector } from "react-redux";
function Home({ spotify }) {
  // const recentlyPlayed = useSelector(selectRecentlyPlayed);
  const newReleases = useSelector(selectNewReleases);
  const topList = useSelector(selectTopList);
  const workout = useSelector(selectWorkout);
  const party = useSelector(selectParty);
  const mood = useSelector(selectMood);

  return (
    <HomeContainer>
      {/* <HomeContentContainer>
        <h1>Recently played Albums</h1>
        <PostsContainer>
          {recentlyPlayed?.recentlyPlayed?.map((track, inx) => (
            <Post
              url={track.track.preview_url}
              spotify={spotify}
              albumId={track.track.album.id}
              key={inx}
              image={track.track.album.images[0].url}
              artistsName={track.track.artists[0].name}
              name={track.track.name}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer> */}

      <HomeContentContainer>
        <h1>New Releases</h1>
        <PostsContainer>
          {newReleases?.newReleases?.map((track, inx) => (
            <Post
              spotify={spotify}
              key={inx}
              albumId={track.id}
              image={track.images[0].url}
              artistsName={track.artists[0].name}
              name={track.name}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>Top play lists</h1>
        <PostsContainer>
          {topList?.topList?.map((track, inx) => (
            <Post
              spotify={spotify}
              playlistId={track.id}
              key={inx}
              image={track.images[0].url}
              artistsName={track.name}
              description={track.description}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>Work out</h1>
        <PostsContainer>
          {workout?.workout?.map((track, inx) => (
            <Post
              spotify={spotify}
              playlistId={track.id}
              key={inx}
              image={track.images[0].url}
              artistsName={track.name}
              description={track.description}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>
      <HomeContentContainer>
        <h1>Mood</h1>
        <PostsContainer>
          {mood?.mood?.map((track, inx) => (
            <Post
              spotify={spotify}
              playlistId={track.id}
              key={inx}
              image={track.images[0].url}
              artistsName={track.name}
              description={track.description}
            />
          ))}
        </PostsContainer>
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>Party</h1>
        <PostsContainer>
          {party?.party?.map((track, inx) => (
            <Post
              spotify={spotify}
              playlistId={track.id}
              key={inx}
              image={track.images[0].url}
              artistsName={track.name}
              description={track.description}
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
  :last-child {
    padding-bottom: 150px;
  }
`;
const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
