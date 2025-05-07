import React from 'react';
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
import {SiCalendly, SiSpigotmc} from "react-icons/si";
import {CgCalendar} from "react-icons/cg";
import {FaCalendarDays} from "react-icons/fa6";
import {formatDateRelatively} from "@/helpers/date.helper";
import {FaDownload} from "react-icons/fa";

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
        icon: (<FaCalendarDays />),
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

    return (
        <div className="w-full flex flex-col items-center m-0 p-0">
            <Navbar/>

            <Grid>
                <div className="col-span-12 lg:col-span-9 flex flex-col">
                    <div className="flex flex-row gap-4 mb-4">
                        <ResourceIcon src={plugin.logoUrl} size="large"/>
                        <div>
                            <h1>{plugin.title}</h1>
                            <p className="text-slate-600 dark:text-slate-300 text-xs lg:text-xl mt-1 mb-3 lg:mb-6">{plugin.description}</p>

                            <Stats>
                                <Stat value="0 Downloads"></Stat>
                                <Stat value={`By ${plugin.author.username}`}></Stat>
                            </Stats>
                        </div>
                    </div>

                    <PluginQuickNavigation pluginSlug={plugin.slug} pluginId={plugin.id}/>

                    <Highlights highlights={highlights}/>

                    <div className="mb-8">
                        <BBCode plugins={preset()} options={{onlyAllowTags: ["*", ...Object.keys(defaultTags)]}}>
                            {plugin.body || ''}
                        </BBCode>
                    </div>
                </div>
            </Grid>
        </div>
    )
}