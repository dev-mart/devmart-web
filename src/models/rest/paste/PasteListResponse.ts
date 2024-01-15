import { PageableRestResponse } from '@/models/rest/PageableRestResponse';
import { Paste } from '@/models/paste/Paste';

export interface PasteListResponse extends PageableRestResponse {

    pastes: Array<Paste>;

}
