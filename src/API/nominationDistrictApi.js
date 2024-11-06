// src/API/nominationDistrict.js

import api from './api';

/**
 * Fetch all nomination districts
 * @returns {Promise<Array>}
 */
export const getNominationDistricts = async () => {
    const response = await api.get('/nominationDistricts');
    return response.data;
};

/**
 * Add a new nomination district
 * @param {Object} nominationDistrictData
 * @returns {Promise<Object>}
 */
export const addNominationDistrict = async (nominationDistrictData) => {
    const response = await api.post('/nominationDistricts', nominationDistrictData);
    return response.data;
};

/**
 * Delete a nomination district
 * @param {string} nominationDistrictId
 * @returns {Promise<Object>}
 */
export const deleteNominationDistrict = async (nominationDistrictId) => {
    const response = await api.delete(`/nominationDistricts/${nominationDistrictId}`);
    return response.data;
};

/**
 * Update a nomination district
 * @param {string} nominationDistrictId
 * @param {Object} nominationDistrictData
 * @returns {Promise<Object>}
 */
export const updateNominationDistrict = async (nominationDistrictId, nominationDistrictData) => {
    const response = await api.patch(`/nominationDistricts/${nominationDistrictId}`, nominationDistrictData);
    return response.data;
};
