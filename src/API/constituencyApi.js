// src/API/constituency.js

import api from './api';

/**
 * Fetch all constituencies from the server
 * @returns {Promise<Array<Constituency>>} List of constituencies
 */
export const getConstituencies = async () => {
    const response = await api.get('/constituencies');
    return response.data;
};

/**
 * Add a new constituency
 * @param {ConstituencyData} constituencyData The data of the constituency to add (name)
 * @returns {Promise<Constituency>} Created constituency
 */
export const addConstituency = async (constituencyData) => {
    const response = await api.post('/constituencies', constituencyData);
    return response.data;
};

/**
 * Delete a constituency
 * @param {string} constituencyId Id of the constituency to delete
 * @returns {Promise<Constituency>} Deleted constituency
 */
export const deleteConstituency = async (constituencyId) => {
    const response = await api.delete(`/constituencies/${constituencyId}`);
    return response.data;
};

/**
 * Update a constituency
 * @param {string} constituencyId Id of the constituency to update
 * @param {object} constituencyData Data to update the constituency with
 * @returns {Promise<Constituency>} Updated constituency
 */
export const updateConstituency = async (constituencyId, constituencyData) => {
    const response = await api.patch(`/constituencies/${constituencyId}`, constituencyData);
    return response.data;
};

/**
 * @typedef {object} ConstituencyData
 * @property {string} name name of the constituency
 */

/**
 * @typedef {object} ConstituencyDateOpt
 * @property {string} [name] name of the constituency
 */

/** 
 * @typedef {object} Constituency
 * @property {string} _id Id of the constituency
 * @property {string} name name of the constituency
 * @property {string} createdAt date the constituency was created
 * @property {string} updatedAt date the constituency was last updated
 * @property {string} __v version of the constituency
 */