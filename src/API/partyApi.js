import api from './api';

/**
 * Fetch all parties
 * @returns {Promise<Array<Party>>} List of parties
 */
export const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

/**
 * Add a new party
 * @param {PartyData} partyData The data of the party to add (name, list)
 * @returns {Promise<Party>} Created party
 */
export const addParty = async (partyData) => {
    const response = await api.post('/parties', partyData);
    return response.data;
};

/**
 * Delete a party
 * @param {string} partyId Id of the party to delete
 * @returns {Promise<Party>} Deleted party
 */
export const deleteParty = async (partyId) => {
    const response = await api.delete(`/parties/${partyId}`);
    return response.data;
};

/**
 * Update a party
 * @param {string} partyId Id of the party to update
 * @param {PartyDataOpt} partyData Data to update the party with
 * @returns {Promise<Party>} Updated party 
 */
export const updateParty = async (partyId, partyData) => {
    const response = await api.patch(`/parties/${partyId}`, partyData);
    return response.data;
};

/**
 * @typedef {object} PartyData
 * @property {string} name name of the party
 * @property {string} list the list of the party (e.g. 'E', 'A', 'Å')
 */

/**
 * @typedef {object} PartyDataOpt
 * @property {string} [name] name of the party
 * @property {string} [list] the list of the party (e.g. 'E', 'A', 'Å')
 */

/**
 * @typedef {object} Party
 * @property {string} _id Id of the party
 * @property {string} name name of the party
 * @property {string} list the list of the party (e.g. 'E', 'A', 'Å')
 * @property {string} createdAt date the party was created
 * @property {string} updatedAt date the party was last updated
 * @property {string} __v version of the party
 */
