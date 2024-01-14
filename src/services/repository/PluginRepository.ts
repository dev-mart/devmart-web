import axios, { AxiosResponse } from 'axios';
import { PluginFilter } from '@/models/rest/plugin/PluginFilter.ts';
import Plugin from '@/models/plugin/Plugin.ts';
import { PluginListResponse } from '@/models/rest/plugin/PluginListResponse.ts';
import { PluginUpdate } from '@/models/plugin/PluginUpdate.ts';
import { PluginUpdatesResponse } from '@/models/rest/plugin/PluginUpdatesResponse.ts';
import { PluginPurchasesResponse } from '@/models/rest/plugin/PluginPurchasesResponse.ts';
import { PluginPurchase } from '@/models/plugin/PluginPurchase.ts';
import { PluginPermissions } from '@/models/plugin/PluginPermissions.ts';
import { API_PLUGINS_URL } from '@/constants/api.ts';

export const client = axios.create({
    baseURL: API_PLUGINS_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
});

const loadParams = (user: number | undefined, query: string | undefined, from: Date | undefined, to: Date | undefined, page: number | undefined,
    perPage: number | undefined, sum: boolean | undefined, compareFrom: Date | undefined = undefined, compareTo: Date | undefined = undefined) => {
    const params = {} as any;
    if (query) {
        params.query = query;
    }
    if (user) {
        params.user = user;
    }
    if (from) {
        params.from = from.toISOString();
    }
    if (to) {
        params.to = to.toISOString();
    }
    if (page) {
        params.page = page;
    }
    if (perPage) {
        params.perPage = perPage;
    }
    if (sum != null) {
        params.sum = sum ? 1 : 0;
    }
    if (compareFrom) {
        params.compareFrom = compareFrom.toISOString();
    }
    if (compareTo) {
        params.compareTo = compareTo.toISOString();
    }
    return params;
};

export default {
    async fetchSales(user: number | undefined = undefined, query: string | undefined = undefined, page: number = 1,
        from: Date | undefined = undefined, to: Date | undefined = undefined, perPage: number | undefined = undefined,
        sum: boolean | undefined = undefined): Promise<AxiosResponse> {
        return await client.get('/sales', {
            params: loadParams(user, query, from, to, page, perPage, sum)
        });
    },

    async fetchSalesSum(user: number | undefined = undefined, from: Date | undefined = undefined, to: Date | undefined = undefined,
        compareFrom: Date | undefined = undefined, compareTo: Date | undefined = undefined): Promise<AxiosResponse> {
        return await client.get('/sales', {
            params: loadParams(user, undefined, from, to, undefined, undefined, true, compareFrom, compareTo)
        });
    },

    async fetchDailySales(user: number | undefined = undefined, query: string | undefined = undefined, from: Date | undefined = undefined,
        to: Date | undefined = undefined, records: number | undefined = undefined): Promise<AxiosResponse> {
        return await client.get('/sales/daily', {
            params: loadParams(user, query, from, to, records, undefined, undefined)
        });
    },

    async fetchPlugins(filter: PluginFilter = PluginFilter.ALL, query: string = '', page: number = 1, perPage: number = 6): Promise<PluginListResponse> {
        const res = await axios.get(API_PLUGINS_URL, {
            params: {
                filter,
                query,
                page,
                perPage
            }
        });
        const data = res.data;

        const plugins: Plugin[] = [];
        for (const plugin of data.plugins) {
            plugins.push(new Plugin(plugin));
        }
        return {
            total: data.total,
            currentPage: data.currentPage,
            pages: data.pages,
            plugins
        };
    },

    async fetchPluginUpdates(pluginId: number, page: number = 1, perPage: number = 10): Promise<PluginUpdatesResponse> {
        const res = await client.get(`/${pluginId}/updates`, {
            params: {
                page,
                perPage
            }
        });
        const data = res.data;

        const updates: PluginUpdate[] = [];
        for (const update of res.data.updates) {
            updates.push(update as PluginUpdate);
        }

        return {
            total: data.total,
            currentPage: data.currentPage,
            pages: data.pages,
            updates
        };
    },

    async fetchPluginPurchases(pluginId: number, page: number = 1, perPage: number = 15, query: number | undefined = undefined,
        from: Date | undefined = undefined, to: Date | undefined = undefined): Promise<PluginPurchasesResponse> {
        const res = await client.get(`/${pluginId}/transactions`, {
            params: {
                page,
                perPage,
                query,
                from,
                to
            }
        });
        const data = res.data;

        const purchases: PluginPurchase[] = [];
        for (const purchase of res.data.transactions) {
            purchases.push(purchase as PluginPurchase);
        }

        return {
            total: data.total,
            currentPage: data.currentPage,
            pages: data.pages,
            purchases
        };
    },

    async fetchPluginUpdate(updateId: number): Promise<PluginUpdate> {
        const res = await client.get(`/updates/${updateId}`);
        return res.data as PluginUpdate;
    },

    async fetchPlugin(pluginId: number, featuresField: boolean = false, saleField: boolean = true, totalDownloadsField: boolean = true,
        authorNameField: boolean = true): Promise<Plugin> {
        const res = await client.get(`/${pluginId}`, {
            params: {
                featuresField,
                saleField,
                totalDownloadsField,
                authorNameField
            }
        });

        return new Plugin(res.data);
    },

    async fetchPluginPermissions(pluginId: number): Promise<PluginPermissions> {
        const res = await client.get(`/${pluginId}/permissions`);
        return res.data as PluginPermissions;
    },

    async fetchUpcomingSales(pluginId: number): Promise<AxiosResponse> {
        return await client.get(`/${pluginId}/sales`);
    },

    async editPlugin(pluginId: number, data: Plugin): Promise<AxiosResponse> {
        return await client.put(`/${pluginId}`, data);
    },

    async updatePlugin(pluginId: number, data: PluginUpdate): Promise<AxiosResponse> {
        return await client.post(`/${pluginId}/update`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    async grantPluginAccess(pluginId: number, userId: number): Promise<AxiosResponse> {
        return await client.post(`/${pluginId}/access/${userId}`);
    },

    async revokePluginAccess(pluginId: number, userId: number): Promise<AxiosResponse> {
        return await client.delete(`/${pluginId}/access/${userId}`);
    }

};
