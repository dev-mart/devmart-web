import React, {FC} from 'react';
import {Grid} from "@/components/common/grid/grid";

interface HeaderBackgroundProps {
    title: string;
    subtitle?: string;
    content?: React.ReactNode;
}

export const HeaderBackground: FC<HeaderBackgroundProps> = ({
                                                                title,
                                                                subtitle,
                                                                content,
                                                            }) => {
    return (
        <div
            className="flex flex-col items-center justify-center relative top-[-80px] mb-[-80px] p-[6.25rem_1.5rem_4rem]
    bg-gradient-to-r from-indigo-600 to-purple-600
    w-full h-full left-0 min-h-[15rem] max-h-[16rem]"
        >
            <div className="flex flex-col items-center justify-center">
                <Grid className="h-full">
                    <div className="text-white col-span-12 text-center flex flex-col gap-2 align-center h-full">
                        <h1 className="text-white">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-white">
                                {subtitle}
                            </p>
                        )}

                        {content}
                    </div>
                </Grid>
            </div>
        </div>
    );
}