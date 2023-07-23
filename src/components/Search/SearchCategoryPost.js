import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { set_categoriesDetail } from "../../features/spotifyDataSlice";
import { spotifyContext } from "../Player";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchCategoryPost({ image, name, id }) {
  const history = useHistory();
  const spotify = useContext(spotifyContext);
  const dispatch = useDispatch();

  const sendSearchDetail = async () => {
    try {
      const getCategoriesDetail = await spotify.getCategoryPlaylists(id, {
        limit: 10,
      });
      //SpotifyWebApi sent null value in array. Need to filter.
      const playListItem = getCategoriesDetail.playlists.items.filter(
        (item) => {
          return item !== null;
        }
      );
      dispatch(
        set_categoriesDetail({
          playListItem,
          id: id,
          name: name,
        })
      );
      history.push(`/search/${id}`);
    } catch (err) {
      alert(err.message);
      history.push("/search");
    }
  };
  return (
    <SearchPostContainer onClick={sendSearchDetail}>
      <SearchPostContent>
        <img src={image} alt="album" />
        <p>{name && name}</p>
      </SearchPostContent>
    </SearchPostContainer>
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
