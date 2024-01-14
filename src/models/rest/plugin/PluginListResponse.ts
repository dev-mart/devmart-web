import { PageableRestResponse } from '@/models/rest/PageableRestResponse.ts';
import Plugin from '@/models/plugin/Plugin.ts';

export interface PluginListResponse extends PageableRestResponse {

    plugins: Array<Plugin>;

}
