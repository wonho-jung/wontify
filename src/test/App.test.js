import { _getToken } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import "jsdom-global/register";

const spotify = new SpotifyWebApi();

describe("Spotify API Unit Tests", () => {
  let accessToken;

  beforeAll(async () => {
    accessToken = await _getToken();
    spotify.setAccessToken(accessToken);
  });

  describe("Get Category Playlists", () => {
    const categories = ["toplists", "workout", "party", "mood"];

    categories.forEach((category) => {
      it(`should get ${category} playlists`, async () => {
        const playlists = await spotify.getCategoryPlaylists(category, {
          limit: 10,
        });
        expect(playlists).toBeDefined();
        // Additional assertions can be added to validate the received data
      });
    });
  });

  describe("Get Categories Playlists", () => {
    it("should get Categories playlists", async () => {
      const categories = await spotify.getCategories();
      expect(categories).toBeDefined();
      // Additional assertions can be added to validate the received data
    });
  });
});
