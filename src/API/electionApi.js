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

/**
 * Advance the phase of the election to the next phase
 * @returns {Promise<{message: string, transactionHash: string}>} Message and transaction hash of the change
 */
export const advancePhase = async () => {
    const response = await api.post('/election/advance-phase');
    return response.data;
};

/**
 * Get the current phase of the election
 * @returns {Promise<{phase: string}>} The current phase of the election
 */
export const getElectionPhase = async () => {
    const response = await api.get('/election/phase');
    return response.data;
};