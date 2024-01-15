import {PageableRestResponse} from '@/models/rest/PageableRestResponse';
import Plugin from '@/models/plugin/Plugin';

export interface PluginListResponse extends PageableRestResponse {

    plugins: Array<Plugin>;

}
