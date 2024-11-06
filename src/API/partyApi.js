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

/**
 * Delete a party
 * @param {string} partyId
 * @returns {Promise<Object>}
 */
export const deleteParty = async (partyId) => {
    const response = await api.delete(`/parties/${partyId}`);
    return response.data;
};

/**
 * Update a party
 * @param {string} partyId
 * @param {Object} partyData
 * @returns {Promise<Object>}
 */
export const updateParty = async (partyId, partyData) => {
    const response = await api.patch(`/parties/${partyId}`, partyData);
    return response.data;
};