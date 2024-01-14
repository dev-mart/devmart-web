import React, {FC} from 'react';

interface HeaderBackgroundProps {
    title: string;
    subtitle?: string;
}

export const HeaderBackground: FC<HeaderBackgroundProps> = ({
                                                                title,
                                                                subtitle
                                                            }) => {
    return (
        <div
            className="flex flex-col align-center relative top-[-80px] mb-[-80px] p-[6.25rem_1.5rem_4rem]
    bg-gradient-to-r from-indigo-600 to-purple-600
    w-full h-full left-0 min-h-[15rem] max-h-[16rem]"
        >
            <div className="flex flex-col align-center">
                <div className="d-grid h-full">
                    <div className="text-white col-span-12 text-center flex flex-col gap-2 align-center h-full">
                        <h1 className="text-white">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-white">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}