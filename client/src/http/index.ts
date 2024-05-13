import axios from 'axios';

const publicAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

authAPI.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export { authAPI, publicAPI };
