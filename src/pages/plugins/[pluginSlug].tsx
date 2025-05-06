import React from 'react';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getApiPlugin} from "@/helpers/plugins.helper";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";
import {createPreset} from "@bbob/preset";
import classNames from "classnames";
import defaultTags from "@/services/BBCodeTags";
import {BBCode} from "@/components/common/bbcode/bbcode";

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
    // const parser = (tree: BBobCoreTagNodeTree, options: BBobPluginOptions): BBobCoreTagNodeTree => {
    //     return tree.walk((node: NodeContent) => {
    //         node
    //     });
    // }


    const preset = createPreset(defaultTags)

    return (
        <div className="flex flex-col max-w-screen-md mx-auto px-4 py-8 gap-8">
            <div>
                <h1>{plugin.title}</h1>
                <p>{plugin.description}</p>
            </div>

            <hr/>

            {/*<BBCode plugins={[presetReact()]}>*/}
            {/*    {plugin.body}*/}
            {/*</BBCode>*/}

            <div className={classNames("bbcode-preview", "bbcode markdown")}>
                <BBCode plugins={preset()} options={{onlyAllowTags: ["*", ...Object.keys(defaultTags)]}}>
                    {/*{replaceBreaks(replaceBrks(replaceTags(plugin.body || '')))}*/}
                    {plugin.body || ''}
                </BBCode>

                {/*<div*/}
                {/*    dangerouslySetInnerHTML={{__html: replaceBreaks(replaceBrks(parseBBCode(replaceTags(plugin.body || ''), preset(), {onlyAllowTags: ["*", ...Object.keys(defaultTags)]})))}}/>*/}
            </div>
        </div>
    )
}