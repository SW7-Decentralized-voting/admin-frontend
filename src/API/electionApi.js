// src/API/election.js

import api from './api';

/**
 * Start a new election
 * @param {number} voterCount
 * @returns {Promise<Object>}
 */
export const startElection = async () => {
    const response = await api.post('/election/start');
    return response.data;
};
