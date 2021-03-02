import React from "react";
import styled from "styled-components";

function Body() {
  return <BodyContainer>Body</BodyContainer>;
}

export default Body;

const BodyContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  background: linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1));
`;
