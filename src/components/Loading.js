import React from "react";
import Spinner from "react-spinkit";
import styled from "styled-components";

function Loading() {
  return (
    <LoadingContainer>
      <h1>Loading...</h1>
      <Spinner name="line-scale-pulse-out" color="#1db954" />
    </LoadingContainer>
  );
}

export default Loading;

const LoadingContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 60px;
    margin-bottom: 50px;
  }
`;
