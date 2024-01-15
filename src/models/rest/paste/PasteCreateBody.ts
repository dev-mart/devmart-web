import { PasteStyle } from '@/models/paste/PasteStyle';
import { PasteVisibility } from '@/models/paste/PasteVisibility';

export interface PasteCreateBody {

    title: string;
    content: string;
    style?: PasteStyle;
    visibility?: PasteVisibility;
    lifetime?: string;

}
