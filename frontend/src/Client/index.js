import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'access-control-allow-origin': 'http://localhost:3000'}
});