import { _getToken } from "../spotify";
import SpotifyWebApi from "spotify-web-api-js";
import "jsdom-global/register";

const spotify = new SpotifyWebApi();

const testGetCategoryPlaylists = (category) => {
  it(`should get a ${category} playlists`, () => {
    return _getToken().then((res) => {
      spotify.setAccessToken(res);
      return spotify
        .getCategoryPlaylists(category, { limit: 10 })
        .then((res) => {
          expect(res).not.toBeUndefined();
        });
    });
  });
};

const testGetCategoriesPlaylists = () => {
  it("should get Categories playlists", () => {
    return _getToken().then((res) => {
      spotify.setAccessToken(res);
      return spotify.getCategories().then((res) => {
        expect(res).not.toBeUndefined();
      });
    });
  });
};

testGetCategoryPlaylists("toplists");
testGetCategoryPlaylists("workout");
testGetCategoryPlaylists("party");
testGetCategoryPlaylists("mood");

testGetCategoriesPlaylists();
