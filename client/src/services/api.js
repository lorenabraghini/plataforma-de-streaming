import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://1e30e683bc20.ngrok.io/",
});

export default api;
