// src/API/nominationDistrict.js

import api from './api';

/**
 * Fetch all nomination districts
 * @param {Array<string>} [populate] Field to
 * @returns {Promise<Array<NominationDistrict>>} List of nomination districts
 */
export const getNominationDistricts = async (populate) => {
    let queryStr = '';
    populate ? queryStr = '?populate=' + populate : null;
    const response = await api.get('/nominationDistricts' + queryStr);
    return response.data;
};

/**
 * Add a new nomination district
 * @param {NominationDistrictData} nominationDistrictData Data of the nomination district to add
 * @returns {Promise<NominationDistrict>} Created nomination district
 */
export const addNominationDistrict = async (nominationDistrictData) => {
    const response = await api.post('/nominationDistricts', nominationDistrictData);
    return response.data;
};

/**
 * Delete a nomination district
 * @param {string} nominationDistrictId Id of the nomination district to delete
 * @returns {Promise<NominationDistrict>} Deleted nomination district
 */
export const deleteNominationDistrict = async (nominationDistrictId) => {
    const response = await api.delete(`/nominationDistricts/${nominationDistrictId}`);
    return response.data;
};

/**
 * Update a nomination district
 * @param {string} nominationDistrictId Id of the nomination district to update
 * @param {NominationDistrictDataOpt} nominationDistrictData Data to update the nomination district with
 * @returns {Promise<NominationDistrict>} Updated nomination district
 */
export const updateNominationDistrict = async (nominationDistrictId, nominationDistrictData) => {
    const response = await api.patch(`/nominationDistricts/${nominationDistrictId}`, nominationDistrictData);
    return response.data;
};

/**
 * @typedef {object} NominationDistrictData
 * @property {string} name Name of the nomination district
 * @property {string} constituency mongoose object id of the constituency the nomination district belongs to
 */

/**
 * @typedef {object} NominationDistrictDataOpt
 * @property {string} [name] Name of the nomination district
 * @property {string} [constituency] mongoose object id of the constituency the nomination district belongs to
 */

/**
 * @typedef {object} NominationDistrict
 * @property {string} _id Id of the nomination district
 * @property {string} name Name of the nomination district
 * @property {string} constituency mongoose
 * @property {string} createdAt date the nomination district was created
 * @property {string} updatedAt date the nomination district was last updated
 * @property {string} __v version of the nomination district
 */