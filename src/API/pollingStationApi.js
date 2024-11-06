import api from './api';

/**
 * Fetch all polling stations
 * @returns {Promise<Array>}
 */
export const getPollingStations = async () => {
  const response = await api.get('/pollingStations');
  return response.data;
};

/**
 * Add a new polling station
 * @param {Object} pollingStationData
 * @returns {Promise<Object>}
 */
export const  addPollingStation = async (pollingStationData) => {
  const response = await api.post('/pollingStations', pollingStationData);
  return response.data;
};

/**
 * Delete a polling station
 * @param {string} pollingStationId
 * @returns {Promise<Object>}
 */
export const deletePollingStation = async (pollingStationId) => {
  const response = await api.delete(`/pollingStations/${pollingStationId}`);
  return response.data;
};

/**
 * Update a polling station
 * @param {string} pollingStationId
 * @param {Object} pollingStationData
 * @returns {Promise<Object>}
 */
export const updatePollingStation = async (pollingStationId, pollingStationData) => {
  const response = await api.patch(`/pollingStations/${pollingStationId}`, pollingStationData);
  return response.data;
};
