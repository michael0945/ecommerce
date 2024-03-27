import axios from "axios";
const axiosInstance = axios.create({
  //local instance  fire base functions
  // baseURL: "http://127.0.0.1:5001/saris-paris/us-central1/api",
  baseURL: "https://web-api-deploy-3.onrender.com/",
});
export { axiosInstance };
