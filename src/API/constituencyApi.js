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

/**
 * Delete a constituency
 * @param {string} constituencyId
 * @returns {Promise<Object>}
 */
export const deleteConstituency = async (constituencyId) => {
    const response = await api.delete(`/constituencies/${constituencyId}`);
    return response.data;
};

/**
 * Update a constituency
 * @param {string} constituencyId
 * @param {Object} constituencyData
 * @returns {Promise<Object>}
 */
export const updateConstituency = async (constituencyId, constituencyData) => {
    const response = await api.patch(`/constituencies/${constituencyId}`, constituencyData);
    return response.data;
};
