import api from './api';

/**
 * Fetch all polling stations
 * @returns {Promise<Array<PollingStation>>} List of polling stations
 */
export const getPollingStations = async () => {
  const response = await api.get('/pollingStations');
  return response.data;
};

/**
 * Add a new polling station
 * @param {PollingStationData} pollingStationData Data of the polling station to add
 * @returns {Promise<PollingStation>} Created polling station
 */
export const  addPollingStation = async (pollingStationData) => {
  const response = await api.post('/pollingStations', pollingStationData);
  return response.data;
};

/**
 * Delete a polling station
 * @param {string} pollingStationId Id of the polling station to delete
 * @returns {Promise<PollingStation>} Deleted polling station
 */
export const deletePollingStation = async (pollingStationId) => {
  const response = await api.delete(`/pollingStations/${pollingStationId}`);
  return response.data;
};

/**
 * Update a polling station
 * @param {string} pollingStationId Id of the polling station to update
 * @param {PollingStationDataOpt} pollingStationData Data to update the polling station with
 * @returns {Promise<PollingStation>} Updated polling station
 */
export const updatePollingStation = async (pollingStationId, pollingStationData) => {
  const response = await api.patch(`/pollingStations/${pollingStationId}`, pollingStationData);
  return response.data;
};

/**
 * @typedef {object} PollingStationData
 * @property {string} name Name of the polling station
 * @property {string} nominationDistrict mongoose object id of the nomination district the polling station belongs to
 * @property {number} expectedVoters Number of expected voters at the polling station
 */

/**
 * @typedef {object} PollingStationDataOpt
 * @property {string} [name] Name of the polling station
 * @property {string} [nominationDistrict] mongoose object id of the nomination district the polling station belongs to
 * @property {number} [expectedVoters] Number of expected voters at the polling station
 */

/**
 * @typedef {object} PollingStation
 * @property {string} _id Id of the polling station
 * @property {string} name Name of the polling station
 * @property {string} nominationDistrict mongoose object id of the nomination district the polling station belongs to
 * @property {number} expectedVoters Number of expected voters at the polling station
 * @property {string} createdAt Date the polling station was created
 * @property {string} updatedAt Date the polling station was last updated
 * @property {string} __v Version of the polling station
 */