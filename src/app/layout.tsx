import React from "react";
import '@/styles/globals.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function AuthPageLayout({
                                           children
                                       }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="robots" content="index, follow"/>
            <meta name="googlebot" content="index, follow"/>
            <title>Devmart</title>

            <script src="https://kit.fontawesome.com/29a1d6d28e.js" crossOrigin="anonymous"></script>
        </head>
        <body className="h-screen">
        {children}
        </body>
        </html>
    );
}