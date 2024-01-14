export interface Order {

    id: string;
    user_id: number;
    plugin_id: number;
    order_id: string;
    payment_amount: number;
    status: string;
    breakdown: object | null;
    created_at: string;
    updated_at: string;

}
