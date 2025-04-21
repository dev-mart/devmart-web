import {Head, Html, Main, NextScript} from 'next/document';
import classNames from "classnames";
import {poppins, roboto} from '@/styles/fonts';

export default function Document() {
    return (
        <Html lang="en" className={classNames(poppins.variable, roboto.variable)}>
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}