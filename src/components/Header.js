import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
function Header() {
  const user = useSelector(selectUser);

  return (
    <HeaderContainer>
      <HeaderRight>
        <Avatar src={user?.user.images[0]?.url} alt="user" />
        <h4>{user?.user.display_name}</h4>
        <hr />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  min-width: 300px;
  /* margin-bottom: 30px; */
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > h4 {
    margin-left: 10px;
  }
`;
