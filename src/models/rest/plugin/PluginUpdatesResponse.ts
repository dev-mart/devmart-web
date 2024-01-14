import { PageableRestResponse } from '@/models/rest/PageableRestResponse.ts';
import { PluginUpdate } from '@/models/plugin/PluginUpdate.ts';

export interface PluginUpdatesResponse extends PageableRestResponse {

    updates: Array<PluginUpdate>;

}
