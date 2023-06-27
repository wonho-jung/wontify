import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <LoginContainer>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png"
        alt=""
      />
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: black;

  > img {
    width: 50%;
  }
  p {
    color: white;
  }

  > a {
    padding: 20px;
    border-radius: 99px;
    background-color: #1db954;
    font-weight: 800;
    text-decoration: none;
    color: #fff;
  }
`;
