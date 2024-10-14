import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_BE_URL,
});

const getPartyCandidates = async (partyId) => {
    const response = await api.get('/candidates?partyId=' + partyId);
    return response.data;
};

const getParties = async () => {
    const response = await api.get('/parties');
    return response.data;
};

const startElection = async () => {
    console.log(api);
    const response = await api.post('/start');

    return response.data
}

export { getPartyCandidates, getParties, startElection};
