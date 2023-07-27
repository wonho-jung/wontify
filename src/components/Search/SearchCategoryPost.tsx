import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { set_categoriesDetail } from "../../features/spotifyDataSlice";
import { useNavigate } from "react-router-dom";
import { spotifyContext } from "App";

interface ISearchCategoryPost {
  image: string;
  name: string;
  id: string;
}

function SearchCategoryPost({ image, name, id }: ISearchCategoryPost) {
  const navigate = useNavigate();
  const spotify = useContext(spotifyContext);
  const dispatch = useDispatch();

  const sendSearchDetail = async () => {
    try {
      const response = await spotify.getCategoryPlaylists(id, {
        limit: 10,
      });
      //SpotifyWebApi sent null value in array. Need to filter.
      const playlistItems = response.playlists.items
        .filter((item) => item !== null)
        .map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            image: item.images[0].url,
          };
        });
      dispatch(
        set_categoriesDetail({
          playlistItems,
          id: id,
          name: name,
        })
      );
      navigate(`/search/${id}`);
    } catch (err) {
      alert(err);
      navigate("/search");
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
