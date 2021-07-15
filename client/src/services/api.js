import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://371183ef19a5.ngrok.io/",
});

export default api;
