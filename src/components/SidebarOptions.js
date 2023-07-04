import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  set_list,
  set_playlistid,
  set_Recommended,
} from "../features/userSlice";

function SidebarOptions({ title, Icon, id }) {
  return (
    <>
      {id ? (
        <Link to={`/playlist/${id}`} style={{ textDecoration: "none" }}>
          <SidebarOptionContainer>
            {Icon && <Icon />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
          </SidebarOptionContainer>
        </Link>
      ) : (
        <SidebarOptionContainer>
          {Icon && <Icon />}
          {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </SidebarOptionContainer>
      )}
    </>
  );
}

export default SidebarOptions;

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
