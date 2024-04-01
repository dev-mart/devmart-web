import axios from "axios";
import {getSession} from "next-auth/react";

export const api = axios.create({
    baseURL: process.env.API_URL
})

api.interceptors.request.use(async (config) => {
    const session = await getSession();
    const token = session?.user.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
})