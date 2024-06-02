import {FC} from "react";
import Head from "next/head";
import {SeoDescription, SeoTitle, SeoTitleSuffix} from "@/constants/seo.constants";

interface SeoMetaProps {
    title: SeoTitle;
    description: SeoDescription;
    image?: string;
    data?: object;
}

export const SeoMeta: FC<SeoMetaProps> = ({
                                              title,
                                              description,
                                              image,
                                              data
                                          }) => {
    const resolvePlaceholders = (text: string) => {
        text = text.replace('{suffix}', SeoTitleSuffix);
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                text = text.replace(`{data:${key}}`, value);
            })
        }
        return text;
    }

    // todo: add fallback image

    return (
        <Head>
            <title>{resolvePlaceholders(title)}</title>
            <meta name="description" content={resolvePlaceholders(description)} />
            <meta name="author" content="Devmart" />
            <meta property="og:site_name" content={SeoTitleSuffix} />
            {image && <meta property="og:image" content={image} />}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={resolvePlaceholders(title)} />
            <meta property="og:description" content={resolvePlaceholders(description)} />
        </Head>
    );
}