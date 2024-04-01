import {PageableRestResponse} from "@/interfaces/api.interface";

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

export enum PasteStyle {
    AUTOMATIC = 'Automatic',
    JAVA = 'Java',
    JAVASCRIPT = 'JavaScript',
    PHP = 'PHP',
    PYTHON = 'Python',
    YAML = 'YAML',
    XML = 'XML',
    JSON = 'JSON',
    HTML = 'HTML',
    LESS = 'Error',
    NONE = 'No Style'
}

export enum PasteVisibility {
    PUBLIC = 'PUBLIC',
    HIDDEN = 'HIDDEN',
    PRIVATE = 'PRIVATE'
}

export interface PasteCreateBody {
    title: string;
    content: string;
    style?: PasteStyle;
    visibility?: PasteVisibility;
    lifetime?: string;
}

export interface PasteListResponse extends PageableRestResponse<Paste> {}
