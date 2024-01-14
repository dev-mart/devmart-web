import { PluginUpdate } from '@/models/plugin/PluginUpdate.ts';
import { PluginSale } from '@/models/plugin/PluginSale.ts';
import DateService from '@/services/DateService.ts';

export default class Plugin {
    id: number;
    name: string;
    description: string;
    title: string;
    features?: string;
    custom: boolean;
    spigot_link?: string;
    github_link?: string;
    minecraft_versions: string;
    dependencies: string;
    categories: string;
    last_updated: string;
    author: number;
    price: number;
    logo_url?: string;
    banner_url?: string;
    donation_url?: string;
    created_at?: Date;
    updated_at?: Date;
    author_username?: string;
    downloads: number;
    latest_update?: PluginUpdate;
    sale?: PluginSale;

    constructor(json: Record<string, any>) {
        this.id = json?.id;
        this.name = json?.name;
        this.description = json?.description;
        this.title = json?.title;
        this.features = json?.features;
        this.custom = json?.custom;
        this.spigot_link = json?.spigot_link;
        this.github_link = json?.github_link;
        this.minecraft_versions = json?.minecraft_versions;
        this.dependencies = json?.dependencies;
        this.categories = json?.categories;
        this.last_updated = json?.last_updated;
        this.author = json?.author;
        this.price = json?.price;
        this.logo_url = json?.logo_url;
        this.banner_url = json?.banner_url;
        this.donation_url = json?.donation_url;
        this.created_at = json.created_at ? new Date(json.created_at) : undefined;
        this.updated_at = json.updated_at ? new Date(json.updated_at) : undefined;
        this.author_username = json?.author_username;
        this.downloads = json?.downloads;
        this.latest_update = json?.latest_update;
        this.sale = json?.sale;
    }

    isRecentlyUpdated(): boolean {
        return DateService.isAfter(
            this.latest_update?.created_at ? new Date(this.latest_update.created_at) : new Date(this.last_updated),
            DateService.offset(-7)
        );
    }

    canBePurchased(): boolean {
        return this.price > 0 || this.custom;
    }

    getLogoUrl(): string {
        if (!this.logo_url) {
            return '/assets/img/logo.png';
        }

        if (this.logo_url.startsWith('data:')) {
            return this.logo_url;
        } else {
            return `/assets/storage/${this.logo_url}`;
        }
    }

    getBannerUrl(): string {
        if (!this.banner_url) {
            return '/assets/img/default-plugin-banner.png';
        }

        if (this.banner_url.startsWith('data:')) {
            return this.banner_url;
        } else {
            return `/assets/storage/${this.banner_url}`;
        }
    }
}
