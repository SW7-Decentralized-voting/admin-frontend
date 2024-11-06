// src/API/candidate.js

import api from './api';

/**
 * Fetch candidates by party ID
 * @param {string} partyId
 * @returns {Promise<Array>}
 */
export const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates', { params: { partyId } });
    return response.data;
};

/**
 * Add a new candidate
 * @param {Object} candidateData
 * @returns {Promise<Object>}
 */
export const addCandidate = async (candidateData) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
};

/**
 * Delete a candidate
 * @param {string} candidateId
 * @returns {Promise<Object>}
 */
export const deleteCandidate = async (candidateId) => {
    const response = await api.delete(`/candidates/${candidateId}`);
    return response.data;
};

/**
 * Update a candidate
 * @param {string} candidateId
 * @param {Object} candidateData
 * @returns {Promise<Object>}
 */
export const updateCandidate = async (candidateId, candidateData) => {
    const response = await api.patch(`/candidates/${candidateId}`, candidateData);
    return response.data;
};
