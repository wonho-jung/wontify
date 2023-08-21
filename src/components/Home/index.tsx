import React from "react";
import styled from "styled-components";

import Post from "../shared/Post";
import { useAppSelector } from "app/hook";

function Home() {
  const { toplistsData, workoutData, partyData, moodData } = useAppSelector(
    (state) => state.spotifyData.categories.data
  );

  return (
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
  );
}

export default Home;

const HomeContentContainer = styled.div`
  // padding-top: 20px;
  // padding-bottom: 20px;

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
