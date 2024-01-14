import type { AppProps } from 'next/app';
import '@/styles/globals.scss';
import Head from "next/head";
import {AuthProvider} from "@/store/auth-context";

export default function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Devmart</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    </>
}