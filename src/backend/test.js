import axios from "axios";

export const apiServer = axios.create({
  baseURL: "http://localhost:8888",
});

export const testAPI = async () => {
  try {
    const response = await apiServer.get("/testAPI");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching external data:", error);
    return { error: "Failed to fetch external data" };
  }
};

export function getCampaigns() {
  return apiServer.get("/testAPI");
}
