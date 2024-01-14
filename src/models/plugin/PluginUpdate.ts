export interface PluginUpdate {

    id: number;
    plugin: number;
    version: string;
    beta_number: number;
    title: string;
    changelog?: string;
    created_at: string;
    downloads?: number;
    file_extension?: string;
    file_size?: number;
    file_name?: string;
    effective_version?: string;

}
