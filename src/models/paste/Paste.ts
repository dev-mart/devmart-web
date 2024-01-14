export interface Paste {

    id: number;
    name: string;
    creator: number;
    creator_username?: string;
    title: string;
    style?: string;
    visibility?: string;
    lifetime?: string; // TODO: add paste lifetime enum?
    expire_at?: Date;
    created_at?: Date;
    updated_at?: Date;
    content?: string;

}
