import axios, {AxiosResponse} from 'axios';
import {LoginBody} from '@/interfaces/LoginBody';
import {API_AUTH_URL, API_BASE_URL} from '@/constants/api';
import {RegisterBody} from "@/interfaces/RegisterBody";

const authClient = axios.create();

export const login = (payload: LoginBody): Promise<AxiosResponse> => {
    return authClient.post(`${API_AUTH_URL}/login`, payload);
};
export const logout = () => {
    return authClient.post(`${API_AUTH_URL}/logout`);
};
export const getAuthUser = () => {
    return authClient.get(`${API_BASE_URL}/user`);
};
export const registerUser = async (
    payload: RegisterBody,
    discordAuthToken?: string
) => {
    return authClient.post(`${API_AUTH_URL}/register${discordAuthToken ? `?discord_auth_token=${discordAuthToken}` : ''}`, payload);
};
