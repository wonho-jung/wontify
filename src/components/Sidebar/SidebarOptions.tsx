import { useBreakpoints } from "components/shared/designSystem";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface ISidebarOptions {
  title: string;
  Icon?: React.ComponentType;
  id?: string;
}

function SidebarOptions({ title, Icon, id }: ISidebarOptions) {
  const { lg } = useBreakpoints();
  return (
    <>
      {id ? (
        <Link to={`/playlist/${id}`}>
          <SidebarOptionContainer lg={lg}>
            {Icon && <Icon />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
          </SidebarOptionContainer>
        </Link>
      ) : (
        <SidebarOptionContainer lg={lg}>
          {Icon && <Icon />}
          {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </SidebarOptionContainer>
      )}
    </>
  );
}

export default SidebarOptions;

const SidebarOptionContainer = styled.div<{ lg: boolean }>`
  color: gray;
  height: 40px;
  cursor: pointer;
  transition: 200ms color ease-in;
  display: flex;
  align-items: center;

  :hover {
    color: ${({ lg }) => (lg ? "#ffffff" : "#1db954")};
  }
  > .MuiSvgIcon-root {
    padding-left: 10px;
    padding-right: 10px;
  }
  > p {
    margin-left: 20px;
    font-size: 14px;
  }
`;
