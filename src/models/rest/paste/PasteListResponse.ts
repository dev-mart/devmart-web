import { PageableRestResponse } from '@/models/rest/PageableRestResponse.ts';
import { Paste } from '@/models/paste/Paste.ts';

export interface PasteListResponse extends PageableRestResponse {

    pastes: Array<Paste>;

}
