import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { set_categoriesDetail } from "../features/userSlice";

function SearchPost({ spotify, image, name, id }) {
  const dispatch = useDispatch();
  const sendSearchDetail = () => {
    spotify.getCategoryPlaylists(id, { limit: 5 }).then((res) => {
      dispatch(
        set_categoriesDetail({
          categoriesDetail: res,
          id: id,
        })
      );
    });
  };
  return (
    <Link to={`/search/${id}`} style={{ textDecoration: "none" }}>
      <PostContainer onClick={sendSearchDetail}>
        <PostContent>
          <img src={image} alt="" />
          <p>{name && name}</p>
        </PostContent>
      </PostContainer>
    </Link>
  );
}

export default SearchPost;

const PostContainer = styled.div`
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
const PostContent = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  > img {
    height: 150px;
  }
`;
