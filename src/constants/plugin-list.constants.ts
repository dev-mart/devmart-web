import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faBolt, faCartShopping, faCompass, faGem} from "@fortawesome/free-solid-svg-icons";

export interface PluginListFilter {
    name: string;
    label: string;
    icon: IconProp;
    requiresAuth?: boolean;
    activeIconColor?: string;
}

export const PluginListFilters: Record<string, PluginListFilter> = {
    ALL: {
        name: 'all',
        label: 'All',
        icon: faCompass,
        activeIconColor: 'text-theme-500'
    },
    PREMIUM: {
        name: 'premium',
        label: 'Premium',
        icon: faGem,
        activeIconColor: 'text-blue-500'
    },
    FREE: {
        name: 'free',
        label: 'Free',
        icon: faBolt,
        activeIconColor: 'text-yellow-500'
    },
    PURCHASED: {
        name: 'purchased',
        label: 'Purchased',
        icon: faCartShopping,
        requiresAuth: true,
        activeIconColor: 'text-theme-500'
    }
}