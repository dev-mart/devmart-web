export interface UserDiscordInformation {
    id: number,
    username: string,
    discriminator?: number,
    avatar: string,
    global_name?: string,
    verified?: boolean,
    email?: string,
    banner?: string,
    accent_color?: number,
}
