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
