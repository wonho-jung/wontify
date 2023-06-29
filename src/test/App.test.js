import { _getToken } from "../spotify";
import SpotifyWebApi from "spotify-web-api-node";

it("should get playlists for a category", async () => {
  const spotify = new SpotifyWebApi();

  const token = await _getToken();
  spotify.setAccessToken(token);

  const playlists = await spotify.getPlaylistsForCategory("party", {
    limit: 10,
  });

  expect(playlists.body).toBeDefined();
});
