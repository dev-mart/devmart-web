import {PageableRestResponse} from '@/models/rest/PageableRestResponse';
import {PluginPurchase} from '@/models/plugin/PluginPurchase';

export interface PluginPurchasesResponse extends PageableRestResponse {

    purchases: Array<PluginPurchase>;

}
