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
import { useBreakpoints } from "./shared/designSystem";
import Navbar from "./Navbar";
type AudioObject = MutableRefObject<HTMLAudioElement | null>;

export const audioContext = createContext<AudioObject | null>(null);

function Player() {
  const { lg } = useBreakpoints();
  const audioObject = useRef<HTMLAudioElement>(new Audio());

  return (
    <BrowserRouter>
      <audioContext.Provider value={audioObject}>
        {!lg && <Navbar />}
        <PlayerBody lg={lg}>
          {lg && (
            <aside>
              <Sidebar />
            </aside>
          )}
          <main>
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
          </main>
        </PlayerBody>
        <Footer />
      </audioContext.Provider>
    </BrowserRouter>
  );
}

export default Player;

const PlayerBody = styled.div<{ lg: boolean }>`
  display: flex;
  aside {
    background-color: #040404;
    color: #ffffff;
    width: 250px;
    padding-left: 10px;
    padding-right: 10px;
  }
  main {
    width: ${({ lg }) => (lg ? "calc(100% - 250px)" : "100%")};
    height: ${({ lg }) => (lg ? "100vh" : "100%")};
    color: white;
    overflow-y: overlay;
    background-color: #121212;
  }
`;
