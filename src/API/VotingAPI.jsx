import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Authorization': import.meta.env.VITE_API_TOKEN,
    },
});

const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates?partyId=' + partyId);
    return response.data;
};

const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

const startElection = async (voterCount) => {
    const response = await api.post('/election/start', { voterCount });
    return response.data;
};

export { getPartyCandidates, getParties, startElection};
