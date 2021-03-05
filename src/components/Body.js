import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectList } from "../features/userSlice";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
function Body({ spotify }) {
  const list = useSelector(selectList);
  console.log(list);
  return (
    <BodyContainer>
      <Header spotify={spotify} />

      <BodyInfo>
        {/* <img src={list?.res.items[0]?.images[0].url} alt="" /> */}
        <BodyInfoText>
          <strong>PLAYLIST</strong>
          {/* <h2>{list?.res.items[0]?.name}</h2>
          <p>{list?.res.items[0]?.description}</p> */}
        </BodyInfoText>
      </BodyInfo>
      <BodySongs>
        <BodyIcons>
          <PlayCircleFilledIcon className="body__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </BodyIcons>
        {/* {list?.res.items[0].tracks.map((item) => (
          <SongRow track={item.track} />
        ))} */}
      </BodySongs>
    </BodyContainer>
  );
}

export default Body;

const BodyContainer = styled.div`
  padding: 30px;
  flex: 0.8;
  height: 100vh;
  color: white;
  background: linear-gradient(rgb(91, 87, 115), rgba(0, 0, 0, 1));
`;
const BodyInfo = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  > img {
    height: 20vw;
    margin: 0 20px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
  }
`;
const BodyInfoText = styled.div`
  flex: 1;
  > h2 {
    font-size: 48px;
    margin-bottom: 10px;
  }
  > p {
    font-size: 14px;
  }
`;

const BodySongs = styled.div`
  margin: 20px -30px;
`;
const BodyIcons = styled.div`
  display: flex;
  align-items: center;
  > .MuiSvgIcon-root {
    margin-right: 20px;
  }
  > .body__shuffle {
    font-size: 80px !important;
    margin-left: 50px;
    margin-top: 20px;
    margin-bottom: 20px;
    :hover {
      transition: 100ms transform ease-in;
      transform: scale(1.08);
    }
  }
`;
