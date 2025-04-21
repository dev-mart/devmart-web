import React from 'react';
import {GetServerSidePropsContext, InferGetStaticPropsType} from "next";
import {getApiPlugin} from "@/helpers/plugins.helper";
import {getSession, useSession} from "next-auth/react";
import nextAuth, {authOptions} from "@/pages/api/auth/[...nextauth]";
import {getServerSession} from "next-auth/next";
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


    console.log('heyrrrr')
    const session: Session | null = await getSession({req: context.req});
    console.log('sesssieee', session)
    const token = session?.user.token;
    console.log('tokenn', token)

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

export default async function PluginPage({plugin}: InferGetStaticPropsType<typeof getServerSideProps>) {
    return (
        <div>
            <h1>{plugin.title}</h1>
            <p>{plugin.description}</p>
        </div>
    )
}