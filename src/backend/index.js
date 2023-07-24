import axios from "axios";

export const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function createPlaylist(data) {
  return apiServer.post("/playlist", data);
}

export function getPlaylists() {
  return apiServer.get("/playlists");
}

export function addSongToPlaylist({ data, id }) {
  return apiServer.put(`/playlist/${id}`, data);
}

export function getPlaylistDetails(id) {
  return apiServer.get(`/playlist/${id}`);
}
export function deletePlaylist(id) {
  return apiServer.delete(`/playlist/${id}`);
}
export function deleteSongFromPlaylist(id, songId) {
  return apiServer.delete(`/playlist/${id}/${songId}`);
}
