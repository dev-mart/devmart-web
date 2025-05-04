import type {AppProps} from 'next/app';
import '@/styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {config} from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";
import Script from "next/script";

config.autoAddCss = false;

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="robots" content="index, follow"/>
                <meta name="googlebot" content="index, follow"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
            <Script src="https://kit.fontawesome.com/29a1d6d28e.js" crossOrigin="anonymous" async/>
        </>
    );
}