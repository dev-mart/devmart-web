import React from 'react';
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {getApiPlugin} from "@/helpers/plugins.helper";
import {getSession} from "next-auth/react";
import {Session} from "next-auth";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    let pluginSlug = context.params?.pluginSlug as string;

    // split the pluginSlug by '.' and get the last element. This is the plugin id.
    // if there is no '.' in the pluginSlug, then the plugin id is the pluginSlug itself.
    const pluginId = parseInt(pluginSlug.split('.').pop() || '');
    console.log(pluginId)
    if (!pluginId) {
        return {
            notFound: true
        }
    }

    const session: Session | null = await getSession({req: context.req});
    const token = session?.user.token;

    try {
        const plugin = await getApiPlugin(pluginId, token);
        console.log(plugin)

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
    return (
        <div>
            <h1>{plugin.title}</h1>
            <p>{plugin.description}</p>
        </div>
    )
}