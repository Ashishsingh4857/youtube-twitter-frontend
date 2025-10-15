import axios from "axios";
import {BASE_URL} from "../constants.js"  // base url example https://api.example.com/v1 

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;


export default axiosInstance;