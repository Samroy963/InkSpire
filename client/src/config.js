const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://inkspire-api.onrender.com";

export default BASE_URL;