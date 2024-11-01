// src/API/party.js

import api from './api';

/**
 * Fetch all parties
 * @returns {Promise<Array>}
 */
export const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

/**
 * Add a new party
 * @param {Object} partyData
 * @returns {Promise<Object>}
 */
export const addParty = async (partyData) => {
    const response = await api.post('/parties', partyData);
    return response.data;
};
