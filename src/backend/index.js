import axios from "axios";

export const apiServer = axios.create({
  baseURL: "http://localhost:8888",
});

// Create a new axios instance for WebSocket notifications
export const wsServer = new WebSocket("ws://localhost:8888");

export function createPlaylist(data) {
  return apiServer.post("/playlist", data);
}

export function getPlaylists() {
  return apiServer.get("/playlists");
}

export function addSongToPlaylist({ data, id }) {
  return apiServer.put(`/playlist/${id}`, data);
}

export function getplaylistDetails(id) {
  return apiServer.get(`/playlist/${id}`);
}

// wsServer.onopen = () => {
//   console.log("WebSocket connection established");

//   // Example: Sending a WebSocket message
//   wsServer.send("Hello WebSocket server!");
// };

// wsServer.onmessage = (event) => {
//   console.log("Received WebSocket message:", event.data);

//   const message = event.data;
//   console.log("Received a message:", message);
// };
