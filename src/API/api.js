// src/API/api.js

import axios from 'axios';

// Create an Axios instance with default configurations
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': sessionStorage.getItem('jwt'),
    },
});

api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('jwt');
        if (token) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        // Handle errors here
        return Promise.reject(error);
    }
);

export default api;
