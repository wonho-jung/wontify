import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <SidebarContainer>
      <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" />
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.2;
  height: 100vh;
  background-color: #040404;
  color: white;
  height: 100vh;
  min-width: 230px;
  padding-left: 10px;
  padding-right: 10px;
  > img {
    height: 70px;
    padding: 10px;
    margin-right: auto;
  }
`;
