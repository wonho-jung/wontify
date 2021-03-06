import React from "react";
import styled from "styled-components";

function SidebarOption({ title, Icon, test }) {
  return (
    <SidebarOptionContainer>
      {Icon && <Icon />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  color: gray;
  height: 40px;
  cursor: pointer;
  transition: 200ms color ease-in;
  display: flex;
  align-items: center;

  :hover {
    color: white;
  }
  > .MuiSvgIcon-root {
    padding-left: 10px;
    padding-right: 10px;
  }
  > p {
    margin-top: 10px;
    margin-left: 20px;
    font-size: 14px;
  }
`;
