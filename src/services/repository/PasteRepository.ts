import axios from 'axios';
import { PasteListResponse } from '@/models/rest/paste/PasteListResponse.ts';
import { Paste } from '@/models/paste/Paste.ts';
import { PasteCreateBody } from '@/models/rest/paste/PasteCreateBody.ts';
import { API_PASTE_URL } from '@/constants/api.ts';

export const client = axios.create({
    baseURL: API_PASTE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

export default {

    /**
     * Fetch a list of recently created/updated pastes.
     * @param page The page to fetch.
     * @param perPage The number of pastes per page.
     */
    async fetchRecentPastes(page: number = 1, perPage: number = 8): Promise<PasteListResponse> {
        const res = await axios.get(API_PASTE_URL, {
            params: {
                page,
                perPage
            }
        });

        const data = res.data;

        return {
            total: data.total,
            currentPage: data.currentPage,
            pages: data.pages,
            pastes: data.pastes
        };
    },

    /**
     * Create a new paste
     * @param body The paste data.
     * @return Promise<Paste> The created paste.
     */
    async createPaste(body: PasteCreateBody): Promise<Paste> {
        const res = await axios.post(API_PASTE_URL, body);

        return res.data;
    },

    /**
     * Update a paste by its ID.
     * @param pasteId The ID of the paste to update.
     * @param body The new paste data.
     * @return Promise<Paste> The updated paste.
     */
    async updatePaste(pasteId: string, body: PasteCreateBody): Promise<Paste> {
        const res = await client.put(`/${pasteId}`, body);
        return res.data;
    },

    /**
     * Deletes a paste by its ID.
     * @param pasteId The ID of the paste to delete.
     * @returns boolean Whether the paste was deleted successfully.
     */
    async deletePaste(pasteId: string): Promise<boolean> {
        const res = await client.delete(`/${pasteId}`);
        return res.status === 200;
    },

    /**
     * Fetch a paste by its ID.
     * @param pasteId The ID of the paste to fetch.
     * @returns Promise<Paste> The fetched paste.
     */
    async fetchPaste(pasteId: string): Promise<Paste> {
        const res = await client.get(`/${pasteId}`);
        // return new Paste(res.data);
        return res.data;
    },

    async fetchUserPastesById(userId: number, query: string = '', page: number = 1): Promise<PasteListResponse> {
        const res = await client.get(`/user/${userId}`, {
            params: {
                query,
                page
            }
        });

        return {
            total: res.data.total,
            currentPage: res.data.currentPage,
            pages: res.data.pages,
            pastes: res.data.pastes
        };
    }

};
