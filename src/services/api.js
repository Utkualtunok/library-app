// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL + '/api/v1',
});

export const fetchAuthors = () => api.get('/authors');
