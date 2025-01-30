import axios from 'axios';
import {API_BASE_URL} from '@env';

const instance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

export const axiosFormInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
