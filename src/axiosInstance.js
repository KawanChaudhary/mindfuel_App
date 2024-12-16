
import axios from 'axios';

// const baseUrl = 'https://mindfuel-web.onrender.com';

const baseUrl = 'http://10.0.2.2:5000';

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
