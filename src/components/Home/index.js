import React, { useContext } from "react";
import styled from "styled-components";
import {
  selectMood,
  selectParty,
  selectTopList,
  selectWorkout,
} from "../../features/spotifyDataSlice";
import { useSelector } from "react-redux";
import Post from "../shared/Post";
import { spotifyContext } from "../Player";
function Home() {
  const spotify = useContext(spotifyContext);
  const { topList } = useSelector(selectTopList);
  const { workout } = useSelector(selectWorkout);
  const { party } = useSelector(selectParty);
  const { mood } = useSelector(selectMood);

  const filterEmptyValueInArray = (array) => {
    if (!array) return;
    const filteredArray = array.filter((item) => {
      return item !== null;
    });
    return filteredArray;
  };

  return (
    <HomeContainer>
      <>
        <HomeContentContainer>
          <h1>Top play lists</h1>
          <PostsContainer>
            {filterEmptyValueInArray(topList).map((track, inx) => (
              <Post
                spotify={spotify}
                playlistId={track?.id}
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
            {filterEmptyValueInArray(workout).map((track, inx) => (
              <Post
                spotify={spotify}
                playlistId={track?.id}
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
            {filterEmptyValueInArray(mood).map((track, inx) => (
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
            {filterEmptyValueInArray(party).map((track, inx) => (
              <Post
                spotify={spotify}
                playlistId={track?.id}
                key={inx}
                image={track.images[0].url}
                artistsName={track.name}
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
