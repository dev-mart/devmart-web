import axios, {AxiosError, AxiosResponse} from 'axios';
import { LoginBody } from '@/interfaces/LoginBody';
import { API_AUTH_URL, API_BASE_URL } from '@/constants/api';
import {RegisterBody} from "@/interfaces/RegisterBody";

export const authClient = axios.create();

export default {
    login(payload: LoginBody): Promise<AxiosResponse> {
        return authClient.post(`${API_AUTH_URL}/login`, payload);
    },
    logout() {
        return authClient.post(`${API_AUTH_URL}/logout`);
    },
    getAuthUser() {
        return authClient.get(`${API_BASE_URL}/user`);
    },
    async registerUser(payload: RegisterBody, discordAuthToken?: string) {
        return authClient.post(`${API_AUTH_URL}/register${discordAuthToken ? `?discord_auth_token=${discordAuthToken}` : ''}`, payload);
    }
};
