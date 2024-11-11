// src/API/api.js

import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': sessionStorage.getItem('jwt'),
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        // Use this for global error handling
        return Promise.reject(error);
    }
);

export default api;
