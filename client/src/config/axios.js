import axios from 'axios';
import { baseURL } from '.';
import { getItemFromLocalStorage } from '../utils/localStorage';

// Get the token from local storage if it exists
const token = getItemFromLocalStorage('token');

// Set the default authorization header for axios
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL,
  // timeout: 2500,
});

export const axiosErrorHandler = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export default axiosInstance;
