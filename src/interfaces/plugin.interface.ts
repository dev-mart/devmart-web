export interface PluginAuthor {
    id: string;
    username: string;
}

export interface Plugin {
    id: number;
    name: string;
    description: string;
    title: string;
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
    author: PluginAuthor;
    createdAt?: Date;
    updatedAt?: Date;
}