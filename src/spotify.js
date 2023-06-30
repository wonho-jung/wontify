// export const authEndpoint = "https://accounts.spotify.com/authorize";
// const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

// const scopes = [
//   "playlist-read-private",
//   "user-read-currently-playing",
//   "user-read-recently-played",
//   "user-read-playback-state",
//   "user-top-read",
//   "user-modify-playback-state",
//   "user-library-read",
//   "user-library-modify",
//   "playlist-modify-public",
//   "playlist-modify-private",
// ];

// export const getTokenFromResponse = () => {
//   return window.location.hash
//     .substring(1)
//     .split("&")
//     .reduce((initial, item) => {
//       var parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);

//       return initial;
//     }, {});
// };
// By spotify developer policy, can't let anyuser to login to my app. So I have to use my own spotify account to login to my app.
// export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
//   "%20"
// )}&response_type=token&show_dialog=true`;

export const _getToken = async () => {
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET_KEY;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
};
