export interface PluginPurchase {

    id: number;
    user_id: number;
    plugin_id: number;
    date: string;
    payment_id: number;
    amount: number;
    email: string;
    platform: string;
    payment_status?: string; // TODO: Add payment status enum
    payment_date?: string;
    username?: string;

}
