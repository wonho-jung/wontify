import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {connect} from "dva";

function SearchPost({ spotify, image, name, id, dispatch }) {
  const sendSearchDetail = () => {
    spotify.getCategoryPlaylists(id, { limit: 10 }).then((res) => {
      dispatch({
          type: 'global/save',
          payload: {
              categoryDetail: {
                  id,
                  ...res
              }
          }
      });
    });
  };
  return (
    <Link to={`/search/${id}`} style={{ textDecoration: "none" }}>
      <SearchPostContainer onClick={sendSearchDetail}>
        <SearchPostContent>
          <img src={image} alt="" />
          <p>{name && name}</p>
        </SearchPostContent>
      </SearchPostContainer>
    </Link>
  );
}

export default connect(({}) => ({}))(SearchPost);

const SearchPostContainer = styled.div`
  color: white;
  width: 200px;
  background-color: #181818;
  margin: 15px;
  border-radius: 20px;

  cursor: pointer;

  opacity: 0.7;

  :hover {
    opacity: 1;
  }
`;
const SearchPostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 150px;
  }
`;
