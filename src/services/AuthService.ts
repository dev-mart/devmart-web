import axios, { AxiosResponse } from 'axios';
import { LoginBody } from '@/interfaces/LoginBody';
import { API_AUTH_URL, API_BASE_URL, LARAVEL_URL } from '@/constants/api';

export const authClient = axios.create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

export default {
    async requestCsrfToken(): Promise<void> {
        await authClient.get(`${LARAVEL_URL}/sanctum/csrf-cookie`);
    },
    login(payload: LoginBody): Promise<AxiosResponse> {
        return authClient.post(`${API_AUTH_URL}/login`, payload);
    },
    logout() {
        return authClient.post(`${API_AUTH_URL}/logout`);
    },
    getAuthUser() {
        return authClient.get(`${API_BASE_URL}/user`);
    },
    async registerUser(payload: any, discordAuthToken: string) {
        await this.requestCsrfToken();
        return authClient.post(`${API_AUTH_URL}/register${discordAuthToken ? `?discord_auth_token=${discordAuthToken}` : ''}`, payload);
    }
};
