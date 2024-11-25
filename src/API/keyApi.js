import api from './api';

/**
 * Fetch number of keys
 * @returns {Promise<>} List of keys
 */
export const getNumOfKeys = async () => {
		const response = await api.get('/keys');
		return response.data;
}

/**
 * Start key generation
 * @returns {Promise<object>} Key data
 */
export const startKeyGeneration = async () => {
		const response = await api.post('/keys/generate');
		return response.data;
}

/**
 * Get key generation status
 * @returns {Promise<object>} Key generation status
 */
export const getKeyGenerationStatus = async (id) => {
		const response = await api.get('/keys/status/' + id);
		return response.data;
}