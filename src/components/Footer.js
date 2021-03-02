import React from "react";
import styled from "styled-components";

function Footer() {
  return <FooterContainer>footer</FooterContainer>;
}

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 65px;
  width: 100%;
  background-color: #282828;
  padding: 20px;
`;
