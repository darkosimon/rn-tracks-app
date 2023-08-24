import axios from "axios";

export default axios.create({
  baseURL: "https://3c7d-77-28-5-2.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
});
