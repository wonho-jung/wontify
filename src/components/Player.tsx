import { MutableRefObject, createContext, useRef } from "react";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import UserPlayList from "./UserPlayList";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Search from "./Search";
import SearchCategory from "./Search/SearchCategoryPostDetail";
import Artist from "./Search/Artist";

import DetailPlaylistSong from "./DetailPlaylist";

type AudioObject = MutableRefObject<HTMLAudioElement | null>;

export const audioContext = createContext<AudioObject | null>(null);

function Player() {
  const audioObject = useRef<HTMLAudioElement>(new Audio());

  return (
    <BrowserRouter>
      <audioContext.Provider value={audioObject}>
        <PlayerContainer>
          <PlayerBody>
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route
                path="/detail_playlist/:playlistId"
                element={<DetailPlaylistSong />}
              />
              <Route path="/search" element={<Search />} />

              <Route path="/search/:id" element={<SearchCategory />} />
              <Route path="/artist/:id" element={<Artist />} />
              <Route path="/playlist/:playlistId" element={<UserPlayList />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </PlayerBody>
          <Footer />
        </PlayerContainer>
      </audioContext.Provider>
    </BrowserRouter>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
