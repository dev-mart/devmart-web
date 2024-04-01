import axios from 'axios';
import {Paste, PasteCreateBody, PasteListResponse} from '@/interfaces/paste.interface';
import {API_PASTE_URL} from '@/constants/api';

export const client = axios.create({
    baseURL: API_PASTE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

/**
 * Fetch a list of recently created/updated pastes.
 * @param page The page to fetch.
 * @param perPage The number of pastes per page.
 */
export const fetchRecentPastes = async (page: number = 1, perPage: number = 8): Promise<PasteListResponse> => {
    const res = await axios.get(API_PASTE_URL, {
        params: {
            page,
            perPage
        }
    });

    return res.data as PasteListResponse;
}

/**
 * Create a new paste
 * @param body The paste data.
 * @return Promise<Paste> The created paste.
 */
export const createPaste = async (body: PasteCreateBody): Promise<Paste> => {
    const res = await axios.post(API_PASTE_URL, body);

    return res.data;
}

/**
 * Update a paste by its ID.
 * @param pasteId The ID of the paste to update.
 * @param body The new paste data.
 * @return Promise<Paste> The updated paste.
 */
export const updatePaste = async (pasteId: string, body: PasteCreateBody): Promise<Paste> => {
    const res = await client.put(`/${pasteId}`, body);
    return res.data;
}

/**
 * Deletes a paste by its ID.
 * @param pasteId The ID of the paste to delete.
 * @returns boolean Whether the paste was deleted successfully.
 */
export const deletPaste = async (pasteId: string): Promise<boolean> => {
    const res = await client.delete(`/${pasteId}`);
    return res.status === 200;
}

/**
 * Fetch a paste by its ID.
 * @param pasteId The ID of the paste to fetch.
 * @returns Promise<Paste> The fetched paste.
 */
export const fetchPaste = async (pasteId: string): Promise<Paste> => {
    const res = await client.get(`/${pasteId}`);
    // return new Paste(res.data);
    return res.data;
}

export const fetchUserPastesById = async (userId: number, query: string = '', page: number = 1): Promise<PasteListResponse> => {
    const res = await client.get(`/user/${userId}`, {
        params: {
            query,
            page
        }
    });

    return res.data as PasteListResponse;
}
