// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://www.api.smartpills.in/', // Replace with your base URL
  // You can add other default configurations here if needed
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default axiosClient;
