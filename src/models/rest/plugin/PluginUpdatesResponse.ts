import { PageableRestResponse } from '@/models/rest/PageableRestResponse';
import { PluginUpdate } from '@/models/plugin/PluginUpdate';

export interface PluginUpdatesResponse extends PageableRestResponse {

    updates: Array<PluginUpdate>;

}
