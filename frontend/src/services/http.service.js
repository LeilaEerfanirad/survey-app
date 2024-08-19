import axios from 'axios';
// import { BASE_URL } from '../configs/variables.config';
// import { history } from './history.service';
axios.defaults.baseURL = `http://localhost:3200/api`;

const HttpService = axios.create();

HttpService.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (config.url !== '/login' && token) {
            console.log('REQUEST WITH AUTH');
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
HttpService.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response) return Promise.reject(error);

        if (error.response.status === 401) {
            localStorage.clear();
            // history.go('/login');
        }
        return Promise.reject(error);
    }
);

export default HttpService;
