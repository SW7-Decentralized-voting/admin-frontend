// src/API/election.js

import api from './api';

/**
 * Start a new election
 * @param {number} voterCount
 * @returns {Promise<Object>}
 */
export const startElection = async (voterCount) => {
    const response = await api.post('/election/start', { voterCount });
    return response.data;
};
