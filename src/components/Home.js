import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./Post";
import {
  selectMood,
  selectNewReleases,
  selectParty,
  selectTopList,
  selectWorkout,
} from "../features/userSlice";
import { useSelector } from "react-redux";
import Loading from "./Loading";
function Home({ spotify }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const newReleases = useSelector(selectNewReleases);
  const topList = useSelector(selectTopList);
  const workout = useSelector(selectWorkout);
  const party = useSelector(selectParty);
  const mood = useSelector(selectMood);

  const filterEmtypeValueInArray = (array) => {
    if (!array) return;
    const filteredArray = array.filter((item) => {
      return item !== null;
    });
    return filteredArray;
  };

  useEffect(() => {
    if (
      newReleases?.newReleases &&
      topList?.topList &&
      workout?.workout &&
      party?.party &&
      mood?.mood
    ) {
      setIsLoaded(true);
    }
  }, [newReleases, topList, workout, party, mood]);

  return (
    <HomeContainer>
      {isLoaded ? (
        <>
          <HomeContentContainer>
            <h1>New Releases</h1>
            <PostsContainer>
              {filterEmtypeValueInArray(newReleases?.newReleases).map(
                (track, inx) => (
                  <Post
                    spotify={spotify}
                    key={inx}
                    albumId={track.id}
                    image={track.images[0].url}
                    artistsName={track.artists[0].name}
                    name={track.name}
                  />
                )
              )}
            </PostsContainer>
          </HomeContentContainer>

          <HomeContentContainer>
            <h1>Top play lists</h1>
            <PostsContainer>
              {filterEmtypeValueInArray(topList?.topList).map((track, inx) => (
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
              {filterEmtypeValueInArray(workout?.workout)?.map((track, inx) => (
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
              {filterEmtypeValueInArray(mood?.mood)?.map((track, inx) => (
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
              {filterEmtypeValueInArray(party?.party)?.map((track, inx) => (
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
      ) : (
        <>
          <div>
            <Loading />
          </div>
        </>
      )}
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
