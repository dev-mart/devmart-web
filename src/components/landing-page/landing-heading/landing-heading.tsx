import React, {FC} from 'react';
import {Navbar} from "@/components/common/navbar/navbar";

interface LandingHeadingProps {
    title: string;
    subtitle: string;
}

export const LandingHeading: FC<LandingHeadingProps> = ({
                                                            title,
                                                            subtitle
                                                        }) => {
    return (
        <div className="w-full h-screen bg-pink-700 bg-gradient-to-br from-pink-600 to-purple-950">
            <div className="flex flex-col h-full">
                <div className="w-full flex flex-col items-center m-0 p-0">
                    <Navbar/>
                </div>

                <div className="flex flex-col items-center justify-center gap-0 text-center h-full -mt-20">
                    <h1 className="text-5xl font-bold text-white uppercase">{title}</h1>
                    <div className="text-2xl text-white mt-1">{subtitle}</div>
                </div>
            </div>
        </div>
    )
}