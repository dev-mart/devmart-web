import React, {FC} from 'react';
import {Plugin} from '@/interfaces/plugin.interface';
import Link from "next/link";
import {getPluginLink, isPluginRecentlyUpdated} from "@/helpers/plugins.helper";
import {Stats} from "@/components/common/stats/stats";
import {Stat} from "@/components/common/stats/stat";
import {PluginLabel} from "@/components/plugins/plugin-label";
import {diffInDays, formatDateRelatively} from "@/helpers/date.helper";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {PluginPreviewBanner} from "@/components/plugins/plugin-preview/elements/plugin-preview-banner";
import Image from "next/image";

interface PluginPreviewProps {
    plugin: Plugin;
}

export const PluginPreview: FC<PluginPreviewProps> = ({plugin}) => {
    const lastUpdated = new Date(plugin.updatedAt ?? 0);
    const formattedDate = formatDateRelatively(lastUpdated, diffInDays(new Date(), lastUpdated) <= 7);

    const fallbackImage = '/svg/fallback-cover-image.svg';
    const fallbackIcon = '/svg/fallback-cover-icon.svg';

    return (
        <Link href={getPluginLink(plugin)} className="plain">
            <div className="gap-x-4 w-full col-gap-4 flex flex-row">
                <PluginPreviewBanner bannerUrl={plugin.bannerUrl || fallbackImage}/>
                <Image
                    src={plugin.logoUrl || fallbackIcon}
                    height={48}
                    width={48}
                    alt="Logo image"
                    className="w-12 h-12 object-cover rounded-lg border-0 lg:hidden"
                />
                <div className="h-full lg:min-h-[9rem] flex flex-col">
                    <div className="flex flex-row">
                        <Image
                            src={plugin.logoUrl || fallbackIcon}
                            height={24}
                            width={24}
                            alt="Plugin logo"
                            className="w-6 h-6 rounded-md mr-1.5 hidden lg:block object-cover"
                        />
                        <h2 className="text-base font-bold break-words">
                            {plugin.title}
                            {/*{plugin?.version && (*/}
                            {/*    <span className="text-gray-400 font-normal ml-1">*/}
                            {/*        {plugin.version}*/}
                            {/*    </span>*/}
                            {/*)}*/}
                        </h2>
                    </div>
                    <div className="text-sm mt-1">{plugin.description}</div>
                    <Stats>
                        {/*<Stat dot={false} small value={`${StringService.formatNumber(plugin?.downloads || 0)} Downloads`}/>*/}
                        <Stat small dot={false} value={`By ${plugin.author.username}`}/>
                        <Stat small value={`Updated ${formattedDate}`}/>
                    </Stats>
                    <div className="mt-1.5 lg:mt-auto gap-x-2 flex flex-row">
                        {/*{plugin.sale && <PluginLabel background="bg-red-400" label={`${plugin.sale.percentage.toFixed(0)}% Sale`}/>}*/}
                        {plugin.custom && <PluginLabel label="Custom"/>}
                        {plugin.price > 0 && <PluginLabel label="Paid"/>}
                        {isPluginRecentlyUpdated(plugin) && <PluginLabel icon={faCalendarDays} label="Recently Updated"/>}
                    </div>
                </div>
            </div>
        </Link>
    );
}
