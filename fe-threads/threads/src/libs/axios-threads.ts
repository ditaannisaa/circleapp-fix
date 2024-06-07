import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export function setAuthToken(token: string) {
  if (token) {
    Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Api.defaults.headers.common["Authorization"];
  }
}
