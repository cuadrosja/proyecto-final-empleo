// src/api/axios.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/v1",
});
