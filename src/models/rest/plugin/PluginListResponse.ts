import {PageableRestResponse} from '@/models/rest/PageableRestResponse';
import {Plugin} from '@/interfaces/plugin.interface'

export interface PluginListResponse extends PageableRestResponse<Plugin> {}
