import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8800",
  timeout: 5000,
});

export default $axios;
