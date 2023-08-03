import axios from "axios";
import { ISongs } from "features/userPlaylistSlice";

export const apiServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function createPlaylist(data: { name: string }) {
  return apiServer.post("/playlist", data);
}

export function getPlaylists() {
  return apiServer.get("/playlists");
}

export function addSongToPlaylist({ data, id }: { data: ISongs; id: string }) {
  return apiServer.put(`/playlist/${id}`, data);
}

export function getPlaylistDetails(id: string) {
  return apiServer.get(`/playlist/${id}`);
}
export function deletePlaylist(id: string) {
  return apiServer.delete(`/playlist/${id}`);
}
export function deleteSongFromPlaylist({
  id,
  songId,
}: {
  id: string;
  songId: string;
}) {
  return apiServer.delete(`/playlist/${id}/${songId}`);
}
