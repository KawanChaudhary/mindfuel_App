
import axios from 'axios';

const baseUrl = 'https://mindfuel-web.onrender.com';

// const localBaseUrl = 'http://localhost:5000';

const instance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

export const axiosFormInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
