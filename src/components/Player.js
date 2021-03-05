import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Player({ spotify }) {
  return (
    <PlayerContainer>
      <PlayerBody>
        <Sidebar />
        <Body spotify={spotify} />
      </PlayerBody>
      <Footer />
    </PlayerContainer>
  );
}

export default Player;

const PlayerContainer = styled.div``;

const PlayerBody = styled.div`
  display: flex;
`;
