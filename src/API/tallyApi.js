import api from './api';

/**
 * Get tallying data for the election
 * @returns {Promise<{tally: object}>} Tallying data
 */
export const tally = async () => {
    const response = await api.post('/tally');
    return response.data;
};