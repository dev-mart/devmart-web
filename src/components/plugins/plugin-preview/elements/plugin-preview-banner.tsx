import React, {FC} from 'react';
import Image from "next/image";

interface PluginPreviewBannerProps {
    bannerUrl: string | undefined;
}

export const PluginPreviewBanner: FC<PluginPreviewBannerProps> = ({bannerUrl}) => {
    return (
        <Image
            src={bannerUrl ?? '/svg/fallback-cover-image.svg'}
            alt="Banner Image"
            width={256}
            height={144}
            className="w-full max-w-[16rem] object-cover rounded-lg hidden lg:block"
        />
    );
}
