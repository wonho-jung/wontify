import React from "react";
import styled from "styled-components";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
function Footer() {
  return (
    <FooterContainer>
      <FooterLeft>
        <img
          src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3578146698962030&height=300&width=300&ext=1618755507&hash=AeTR_TP5fNgF16LMd_Y"
          alt=""
        />
        <FooterSongInfo>
          {/* <h4>songName</h4> */}
          <p>By won.9 devoloper</p>
        </FooterSongInfo>
      </FooterLeft>
      <FooterCenter>
        <ShuffleIcon style={{ color: "green" }} />
        <SkipPreviousIcon />
        <PlayCircleOutlineIcon fontSize="large" />
        <SkipNextIcon />
        <RepeatIcon style={{ color: "green" }} />
      </FooterCenter>
      <FooterRight>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </FooterRight>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  height: 65px;
  width: 100%;
  background-color: #282828;
  padding: 20px;
`;

const FooterLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  color: white;
  width: 300px;
  > img {
    height: 60px;
    width: 60px;
    margin-right: 20px;
    object-fit: contain;
  }
`;
const FooterSongInfo = styled.div`
  h4 > {
    font-size: 12px;
  }
  p > {
    font-size: 12px;
  }
`;

const FooterCenter = styled.div`
  flex: 0.4;
  padding: 0 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  > .MuiSvgIcon-root:hover {
    transition: transform 0.2s ease-in-out !important;
    transform: scale(1.2) !important;
  }
`;

const FooterRight = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding-right: 40px;
  > * .MuiSlider-root {
    color: green;
  }
`;
