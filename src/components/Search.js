import React from "react";
import styled from "styled-components";
import SearchPost from "./SearchPost";
import SearchHeader from "./SearchHeader";
import {connect} from "dva";

function Search({ spotify, category }) {

  return (
    <SearchContainer>
      <SearchHeader spotify={spotify} />

      <h3>Browse all</h3>
      <CategoryContainer>
        <Categorycontent>
          {category?.categories?.items.map((item, idx) => (
            <SearchPost
              key={idx}
              id={item.id}
              spotify={spotify}
              image={item.icons[0].url}
              name={item.name}
            />
          ))}
        </Categorycontent>
      </CategoryContainer>
    </SearchContainer>
  );
}

export default connect(({global}) => ({...global}))(Search);

const SearchContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;

  overflow: auto;
  background-color: #121212;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const CategoryContainer = styled.div`
  width: 100%;
`;
const Categorycontent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
