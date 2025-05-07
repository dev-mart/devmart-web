import {PageableRestResponse} from '@/interfaces/api.interface';

export interface PluginAuthor {
    id: string;
    username: string;
}

export interface PluginUpdate {
    id: number;
    version: string;
    betaNumber: number;
    title: string;
    changelog: string;
    downloads: number;
    createdAt: string;
    fileExtension: string;
    fileSize: number;
    displayName: string;
}

export interface Plugin {
    id: number;
    name: string;
    description: string;
    title: string;
    slug: string;
    body?: string;
    custom: boolean;
    spigotId?: number;
    githubLink?: string;
    minecraftVersions: string;
    dependencies: string;
    categories: string;
    price: number;
    logoUrl?: string;
    bannerUrl?: string;
    donationUrl?: string;
    downloads: number;
    author: PluginAuthor;
    createdAt: Date;
    updatedAt: Date;
    latestUpdate?: PluginUpdate;
}

export enum PluginFilter {
    ALL = 'all',
    PURCHASED = 'purchased',
    PREMIUM = 'premium',
    FREE = 'free',
}

export interface PluginListResponse extends PageableRestResponse<Plugin> {
}