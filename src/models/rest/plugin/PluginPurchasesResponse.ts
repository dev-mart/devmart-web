import { PageableRestResponse } from '@/models/rest/PageableRestResponse.ts';
import { PluginPurchase } from '@/models/plugin/PluginPurchase.ts';

export interface PluginPurchasesResponse extends PageableRestResponse {

    purchases: Array<PluginPurchase>;

}
