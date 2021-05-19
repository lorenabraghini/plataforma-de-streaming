import socketIOClient from "socket.io-client";

const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `${window.location.protocol}//${window.location.host}`
    : "http://localhost:3000";
export const socket = socketIOClient(ENDPOINT);
