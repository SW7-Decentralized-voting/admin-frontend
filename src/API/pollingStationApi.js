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
