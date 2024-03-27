import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faBolt, faCartShopping, faCompass, faGem} from "@fortawesome/free-solid-svg-icons";

export interface PluginListFilter {
    name: string;
    label: string;
    icon: IconProp;
}

export const PluginListFilters: Record<string, PluginListFilter> = {
    ALL: {
        name: 'all',
        label: 'All',
        icon: faCompass
    },
    PURCHASED: {
        name: 'purchased',
        label: 'Purchased',
        icon: faCartShopping
    },
    PREMIUM: {
        name: 'premium',
        label: 'Premium',
        icon: faGem
    },
    FREE: {
        name: 'free',
        label: 'Free',
        icon: faBolt
    }
}