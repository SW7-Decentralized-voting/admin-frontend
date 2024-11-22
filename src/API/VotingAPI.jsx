import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8888/api/v1', // Default to localhost if VITE_API_URL is not set
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`, // Include the token
        'Content-Type': 'application/json',
    },
});

// Fetching party candidates by partyId
const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates?partyId=' + partyId);
    return response.data;
};

// Fetching parties list
const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

// Starting an election
const startElection = async (voterCount) => {
    try {
        const response = await api.post('/election/start', { voterCount });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in startElection API:', error);
        throw error; // Allow error to propagate
    }
};

// Updating election phase
const updatePhase = async (phase) => {
    try {
        const response = await api.post('/election/updatePhase', { phase });
        return response.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error in updatePhase API:', error);
        throw error; // Allow error to propagate
    }
};

export { getPartyCandidates, getParties, startElection, updatePhase };
