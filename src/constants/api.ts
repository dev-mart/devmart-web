export const LARAVEL_URL = process.env.LARAVEL_URL || 'http://localhost:8000';
export const API_BASE_URL = process.env.API_URL || `${LARAVEL_URL}/api`;

export const API_AUTH_URL = `${API_BASE_URL}/auth`;
export const API_PASTE_URL = `${API_BASE_URL}/paste`;
export const API_USERS_URL = `${API_BASE_URL}/users`;
export const API_PLUGINS_URL = `${API_BASE_URL}/plugins`;
