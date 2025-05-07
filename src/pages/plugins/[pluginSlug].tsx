import React, {FC, PropsWithChildren} from 'react';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getApiPlugin} from "@/helpers/plugins.helper";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {createPreset} from "@bbob/preset";
import defaultTags from "@/services/BBCodeTags";
import {BBCode} from "@/components/common/bbcode/bbcode";
import {Navbar} from "@/components/common/navbar/navbar";
import {Grid} from "@/components/common/grid/grid";
import {ResourceIcon} from "@/components/common/resource-icon/resource-icon";
import {Stats} from "@/components/common/stats/stats";
import {Stat} from "@/components/common/stats/stat";
import {PluginQuickNavigation} from "@/components/plugins/plugin-quick-navigation/plugin-quick-navigation";
import {Highlight, Highlights} from '@/components/plugins/highlights/highlights';
import {SiGithub, SiPaypal, SiSpigotmc} from "react-icons/si";
import {FaCalendarDays} from "react-icons/fa6";
import {formatDateRelatively} from "@/helpers/date.helper";
import {FaDownload} from "react-icons/fa";
import {Sidebar} from "@/components/common/sidebar/sidebar";
import {StickyFooter} from "@/components/common/sticky-footer/sticky-footer";
import {LinkButton} from "@/components/common/button/button";
import classNames from "classnames";
import {formatFileSize, formatMoney} from "@/services/StringService";
import {Icon} from "@/components/common/icon/icon";
import {Breadcrumb, BreadcrumbItem} from "flowbite-react";
import {HiHome} from "react-icons/hi";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    let pluginSlug = context.params?.pluginSlug as string;

    // split the pluginSlug by '.' and get the last element. This is the plugin id.
    // if there is no '.' in the pluginSlug, then the plugin id is the pluginSlug itself.
    const pluginId = parseInt(pluginSlug.split('.').pop() || '');
    if (!pluginId) {
        return {
            notFound: true
        }
    }

    const session: Session | null = await getSession({req: context.req});
    const token = session?.user.token;

    try {
        const plugin = await getApiPlugin(pluginId, token);

        console.log('plugin', plugin);

        return {
            props: {
                plugin
            }
        }
    } catch (e) {
        console.error(e);
        return {
            notFound: true
        }
    }
}

export default function PluginPage({plugin}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const preset = createPreset(defaultTags)

    const supportedVersions = plugin.minecraftVersions.length > 0 ? plugin.minecraftVersions : "Not specified.";

    const highlights: Highlight[] = [];
    highlights.push({
        icon: (<SiSpigotmc/>),
        title: "Supported Versions",
        description: supportedVersions,
    });
    highlights.push({
        icon: (<FaCalendarDays/>),
        title: "Last Updated",
        description: formatDateRelatively(new Date(plugin.updatedAt ?? plugin.createdAt ?? 0), true)
    });
    if (plugin.dependencies.length > 0) {
        highlights.push({
            icon: (<FaDownload/>),
            title: "(Soft) Dependencies",
            description: plugin.dependencies
        });
    }

    const downloadButtonContent = plugin.latestUpdate && (
        <div className="flex flex-col align-center text-center">
            <div className="leading-tight">Download</div>
            <div
                className="text-tiny leading-tight font-normal">{formatFileSize(plugin.latestUpdate.fileSize)} ({plugin.latestUpdate.fileExtension})
            </div>
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center m-0 p-0">
            <Navbar/>

            <Grid className="mt-8">
                <div className="col-span-12">
                    <Breadcrumb>
                        <BreadcrumbItem icon={HiHome} href="/plugins">Plugins</BreadcrumbItem>
                        <BreadcrumbItem>
                            <div className="max-w-48 overflow-hidden text-ellipsis whitespace-nowrap">
                                {plugin.title}
                            </div>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-span-12 lg:col-span-9 flex flex-col">
                    <div className="flex flex-row gap-4 mb-8">
                        <ResourceIcon src={plugin.logoUrl} size="large" className="hidden md:block"/>
                        <div>
                            <h1>{plugin.title}</h1>
                            <p className="text-slate-600 dark:text-slate-300 text-xs lg:text-xl mt-1 mb-3 lg:mb-6">{plugin.description}</p>

                            <Stats>
                                <Stat value={`${plugin.downloads} Downloads`}></Stat>
                                <Stat value={`By ${plugin.author.username}`}></Stat>
                            </Stats>
                        </div>
                    </div>

                    <PluginQuickNavigation pluginSlug={plugin.slug} pluginId={plugin.id}/>

                    <Highlights highlights={highlights}/>

                    <div className="mb-8 bbcode-preview">
                        <BBCode plugins={preset()} options={{onlyAllowTags: ["*", ...Object.keys(defaultTags)]}}>
                            {plugin.body || ''}
                        </BBCode>
                    </div>
                </div>
                <Sidebar side="right" className="pb-8">
                    {plugin.latestUpdate && (
                        <StickyFooter fixed className="block lg:hidden">
                            <LinkButton href={`/plugins/${plugin.slug}.${plugin.id}/download`} target="_blank" fullWidth>
                                {downloadButtonContent}
                            </LinkButton>
                        </StickyFooter>
                    )}

                    <hr className="lg:hidden"/>

                    {plugin.latestUpdate && (
                        <LinkButton href={`/plugins/${plugin.slug}.${plugin.id}/download`} fullWidth target="_blank" className="hidden lg:flex">
                            {downloadButtonContent}
                        </LinkButton>
                    )}
                    <LinkButton theme="secondary" href={`/plugins/${plugin.slug}.${plugin.id}/updates`} className="hidden lg:flex mt-2">
                        Updates
                    </LinkButton>

                    <hr className="hidden lg:block"/>

                    <SidebarHeader className="mt-2">Author</SidebarHeader>
                    <div>{plugin.author.username}</div>

                    {plugin.price > 0 && (
                        <>
                            <SidebarHeader className="mt-2">Price</SidebarHeader>
                            <div>{formatMoney(plugin.price, false)}</div>
                            {/* TODO: Add sale price old when available */}
                        </>
                    )}

                    <SidebarHeader className="mt-2">Downloads</SidebarHeader>
                    <div>{plugin.downloads}</div>

                    <SidebarHeader className="mt-2">Version</SidebarHeader>
                    <div>v1.0.0</div>

                    <SidebarHeader className="mt-2">Last Updated</SidebarHeader>
                    <div>{formatDateRelatively(new Date(plugin.updatedAt ?? plugin.createdAt ?? 0), true)}</div>

                    {plugin.categories.length > 0 && (
                        <>
                            <SidebarHeader className="mt-8 mb-2">Categories</SidebarHeader>
                            <div className="flex flex-wrap gap-2">
                                {plugin.categories.split(",").map((category) => (
                                    <div
                                        className="flex flex-col align-center justify-center h-8 px-4 bg-gray-100 dark:bg-gray-800 rounded-md capitalize text-sm text-neutral-600 dark:text-gray-400"
                                        key={category}
                                    >
                                        {category}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    <SidebarHeader className="mt-8 mb-2">Links</SidebarHeader>
                    <div className="flex flex-wrap gap-2">
                        {plugin.spigotId != null && (
                            <a href={`https://www.spigotmc.org/resources/${plugin.spigotId}`} target="_blank">
                                <Icon icon={<SiSpigotmc/>}></Icon>
                            </a>
                        )}
                        {plugin.githubLink != null && (
                            <a href={`https://github.com/${plugin.githubLink}`} target="_blank">
                                <Icon icon={<SiGithub/>}></Icon>
                            </a>
                        )}

                        <a href={plugin.donationUrl ?? "/donate"} target="_blank">
                            <Icon icon={<SiPaypal/>}></Icon>
                        </a>
                    </div>
                </Sidebar>
            </Grid>
        </div>
    )
}

const SidebarHeader: FC<PropsWithChildren<{ className: string }>> = ({children, className}) => {
    return (
        <h3 className={classNames(className, "text-gray-700 dark:text-gray-200 font-medium font-roboto text-xs uppercase")}>
            {children}
        </h3>
    )
}