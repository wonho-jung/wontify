import React from "react";
import styled from "styled-components";
import Post from "./Post";
import {connect} from "dva";

function Home({ spotify, recentlyPlayed, newReleases, topList, workout, party, mood}) {

  return (
    <HomeContainer>
      <HomeContentContainer>
        <h1>Recently played Albums</h1>
        <PostsContainer>
          {recentlyPlayed?.map((track, inx) => (
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
      </HomeContentContainer>

      <HomeContentContainer>
        <h1>New Releases</h1>
        <PostsContainer>
          {newReleases?.map((track, inx) => (
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
          {topList?.map((track, inx) => (
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
          {workout?.map((track, inx) => (
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
          {mood?.map((track, inx) => (
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
          {party?.map((track, inx) => (
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

export default connect(({global}) => ({...global}))(Home);

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
