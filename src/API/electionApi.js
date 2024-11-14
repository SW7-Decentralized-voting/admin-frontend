// src/API/election.js

import api from './api';

/**
 * Start a new election
 * @returns {Promise<object>} Election data
 */
export const startElection = async () => {
    const response = await api.post('/election/start');
    return response.data;
};