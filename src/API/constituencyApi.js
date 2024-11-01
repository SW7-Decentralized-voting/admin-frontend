// src/API/constituency.js

import api from './api';

/**
 * Fetch all constituencies
 * @returns {Promise<Array>}
 */
export const getConstituencies = async () => {
    const response = await api.get('/constituencies');
    return response.data;
};

/**
 * Add a new constituency
 * @param {Object} constituencyData
 * @returns {Promise<Object>}
 */
export const addConstituency = async (constituencyData) => {
    const response = await api.post('/constituencies', constituencyData);
    return response.data;
};
