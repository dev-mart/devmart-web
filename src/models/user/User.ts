import { AccountTheme } from './AccountTheme.ts';
import { UserRole } from '@/models/user/UserRole.ts';

export class User {
    id?: number;
    username?: string;
    email?: string;
    email_verified_at?: Date;
    discord_id?: string;
    discord_verified?: boolean;
    role: UserRole = UserRole.USER;
    theme: AccountTheme = AccountTheme.System;
    username_changed_at?: Date;
    spigot?: string;
    spigot_verified?: boolean;
    discord_suggestion_notifications?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(json: Record<string, any> = {}) {
        this.id = json.id ?? undefined;
        this.username = json.username ?? undefined;
        this.email = json.email ?? undefined;
        this.email_verified_at = json.email_verified_at ? new Date(json.email_verified_at) : undefined;
        this.discord_id = json.discord_id ?? undefined;
        this.discord_verified = json.discord_verified === 1;
        this.role = json.role ?? 'user';
        this.theme = AccountTheme[json.theme as keyof typeof AccountTheme] ?? AccountTheme.System;
        this.username_changed_at = json.username_changed_at ? new Date(json.username_changed_at) : undefined;
        this.spigot = json.spigot ?? undefined;
        this.spigot_verified = json.spigot_verified === 1;
        this.discord_suggestion_notifications = json.discord_suggestion_notifications ?? undefined;
        this.created_at = json.created_at ? new Date(json.created_at) : undefined;
        this.updated_at = json.updated_at ? new Date(json.updated_at) : undefined;
    }

    static fromJson(json: Record<string, any>): User | null {
        if (!json) {
            return null;
        }
        return new User(json);
    }

    isAdmin(): boolean {
        return this.role === 'admin';
    }
}
