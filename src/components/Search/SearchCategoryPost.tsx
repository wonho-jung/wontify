import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

interface ISearchCategoryPost {
  image: string;
  name: string;
  id: string;
}
//Todo: combine this component with Post component
function SearchCategoryPost({ image, name, id }: ISearchCategoryPost) {
  return (
    <Link to={`/search/${id}`}>
      <SearchPostContainer>
        <SearchPostContent>
          <img src={image} alt="album" />
          <p>{name && name}</p>
        </SearchPostContent>
      </SearchPostContainer>
    </Link>
  );
}

export default SearchCategoryPost;

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
