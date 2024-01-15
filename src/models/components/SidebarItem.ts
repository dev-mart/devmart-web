import {NextRouter} from "next/router";

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

    static isQueryParam(router: NextRouter, key: string, value: string): boolean {
        return router.query[key] === value;
    }
}
