import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${window.location.protocol}//${window.location.host}`
      : "http://a2ee8e6a88ba.ngrok.io/",
});

export default api;
