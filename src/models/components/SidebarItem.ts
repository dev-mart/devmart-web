export default class SidebarItem {
    link: any;
    icon: string;
    label: string;
    renderRequirements?: boolean;
    isDefault?: boolean;
    activeRequirements?: boolean;

    constructor(link: any, icon: string, label: string, renderRequirements: boolean = true, isDefault: boolean = false, activeRequirements?: boolean) {
        this.link = link;
        this.icon = icon;
        this.label = label;
        this.renderRequirements = renderRequirements;
        this.isDefault = isDefault;
        this.activeRequirements = activeRequirements;
    }

    static isQueryParam(key: string, value: string): boolean {
        return useRouter().currentRoute.value.query[key] === value;
    }
}
