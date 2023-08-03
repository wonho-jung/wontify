import React from "react";
import styled from "styled-components";

import Post from "../shared/Post";
import { useAppSelector } from "app/hook";

function Home() {
  const { toplistsData, workoutData, partyData, moodData } = useAppSelector(
    (state) => state.spotifyData.categories.data
  );

  return (
    <HomeContainer>
      <>
        {/*TODO: Make an array and use map to display */}
        <HomeContentContainer>
          <h1>Top play lists</h1>
          <PostsContainer>
            {toplistsData!.map((track, inx) => (
              <Post
                key={inx}
                playlistId={track.playlistId}
                image={track.image}
                artistsName={track.artistsName}
                description={track.description}
              />
            ))}
          </PostsContainer>
        </HomeContentContainer>

        <HomeContentContainer>
          <h1>Work out</h1>
          <PostsContainer>
            {workoutData!.map((track, inx) => (
              <Post
                key={inx}
                playlistId={track.playlistId}
                image={track.image}
                artistsName={track.artistsName}
                description={track.description}
              />
            ))}
          </PostsContainer>
        </HomeContentContainer>
        <HomeContentContainer>
          <h1>Mood</h1>
          <PostsContainer>
            {moodData!.map((track, inx) => (
              <Post
                key={inx}
                playlistId={track.playlistId}
                image={track.image}
                artistsName={track.artistsName}
                description={track.description}
              />
            ))}
          </PostsContainer>
        </HomeContentContainer>

        <HomeContentContainer>
          <h1>Party</h1>
          <PostsContainer>
            {partyData!.map((track, inx) => (
              <Post
                key={inx}
                playlistId={track.playlistId}
                image={track.image}
                artistsName={track.artistsName}
                description={track.description}
              />
            ))}
          </PostsContainer>
        </HomeContentContainer>
      </>
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
