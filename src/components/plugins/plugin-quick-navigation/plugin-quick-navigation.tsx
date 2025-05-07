import {FC} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import classNames from "classnames";

interface PluginQuickNavigationProps {
    pluginSlug: string;
    pluginId: number;
}

export const PluginQuickNavigation: FC<PluginQuickNavigationProps> = ({pluginSlug, pluginId}) => {
    const router = useRouter();

    const links = [
        {
            label: 'Overview',
            href: `/plugins/${pluginSlug}.${pluginId}`,
            route: ''
        },
        {
            label: 'Updates',
            href: `/plugins/${pluginSlug}.${pluginId}/updates`,
            route: '/updates'
        },
        {
            label: 'Versions',
            href: `/plugins/${pluginSlug}.${pluginId}/versions`,
            route: '/versions'
        },
    ];

    return (
        <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap">
                {links.map(({label, href, route}) => {
                    const isActive = router.pathname === `/plugins/[pluginSlug]${route}`;

                    return (
                        <li className="flex-grow sm:flex-grow-0" key={label}>
                            <Link href={href}
                                  className={classNames("inline-block w-full sm:w-fit p-2 sm:p-4 border-b my-[-1px] border-gray-200 dark:border-b-gray-700 rounded-t-lg hover:text-gray-600 hover:border-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-500",
                                      isActive ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300" : "")}>
                                {label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}