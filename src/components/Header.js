import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import {connect} from "dva";
function Header({user}) {

  return (
    <HeaderContainer>
      <HeaderRight>
        <Avatar src={user?.images[0]?.url} alt="user" />
        <h4>{user?.display_name}</h4>
        <hr />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default connect(({global}) => ({...global}))(Header);

const HeaderContainer = styled.div`
  min-width: 300px;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > h4 {
    margin-left: 10px;
  }
`;
