import api from './api';

export const login = async (password) => {
		const response = await api.post('/login', { password });
		return response.data?.token;
};