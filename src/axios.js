import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-e3e01.cloudfunctions.net/api",
  // baseURL: "http://localhost:5001/clone-e3e01/us-central1/api",
});

export default instance;
