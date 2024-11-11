import api from './api';

/**
 * Fetch candidates by party ID
 * @param {string} partyId Party ID to filter candidates
 * @param {Array<string>} populate Fields to populate
 * @returns {Promise<Array>} List of candidates
 */
export const getPartyCandidates = async (partyId, populate=false) => {
    let queryStr = '';
    if (partyId) {
        queryStr = '?party=' + partyId;
        populate ? queryStr += '&populate=' + populate : null;
    } else {
        populate ? queryStr = '?populate=' + populate : null;
    }
    const response = await api.get('/candidates' + queryStr);
    return response.data;
};

/**
 * Add a new candidate
 * @param {CandidateData} candidateData Candidate data
 * @returns {Promise<Candidate>} Created candidate
 */
export const addCandidate = async (candidateData) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
};

/**
 * Delete a candidate
 * @param {string} candidateId Id of the candidate to delete
 * @returns {Promise<Candidate>} Deleted candidate
 */
export const deleteCandidate = async (candidateId) => {
    const response = await api.delete(`/candidates/${candidateId}`);
    return response.data;
};

/**
 * Update a candidate
 * @param {string} candidateId Id of the candidate to update
 * @param {CandidateDataOpt} candidateData Candidate data to update with
 * @returns {Promise<Candidate>} Updated candidate
 */
export const updateCandidate = async (candidateId, candidateData) => {
    const response = await api.patch(`/candidates/${candidateId}`, candidateData);
    return response.data;
};

/**
 * @typedef {object} CandidateData
 * @property {string} name name of the candidate
 * @property {string} party mongoose object id of the party the candidate belongs to
 * @property {string} nominationDistrict mongoose object id of the district the candidate is nominated in
 */

/**
 * @typedef {object} CandidateDataOpt
 * @property {string} [name] name of the candidate
 * @property {string} [party] mongoose object id of the party the candidate belongs to
 * @property {string} [nominationDistrict] mongoose object id of the district the candidate is nominated in
 */

/**
 * @typedef {object} Candidate
 * @property {string} _id Id of the candidate
 * @property {string} name Name of the candidate
 * @property {string} party Id of the party the candidate belongs to
 * @property {string} nominationDistrict Id of the district the candidate is nominated in
 * @property {string} createdAt Date the candidate was created
 * @property {string} updatedAt Date the candidate was last updated
 * @property {string} __v Version of the candidate
 */