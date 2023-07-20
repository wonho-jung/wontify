import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { set_categoriesDetail } from "../../features/userSlice";

function SearchPost({ spotify, image, name, id }) {
  const dispatch = useDispatch();
  const sendSearchDetail = () => {
    spotify.getCategoryPlaylists(id, { limit: 10 }).then((res) => {
      //SpotifyWebApi sent null value in array need to filter.
      const playListItem = res.playlists.items.filter((item) => {
        return item !== null;
      });

      dispatch(
        set_categoriesDetail({
          playListItem,
          id: id,
          name: name,
        })
      );
    });
  };
  return (
    <Link to={`/search/${name}`} style={{ textDecoration: "none" }}>
      <SearchPostContainer onClick={sendSearchDetail}>
        <SearchPostContent>
          <img src={image} alt="" />
          <p>{name && name}</p>
        </SearchPostContent>
      </SearchPostContainer>
    </Link>
  );
}

export default SearchPost;

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
