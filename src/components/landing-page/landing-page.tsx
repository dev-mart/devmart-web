import React, {FC} from 'react';
import {LandingHeading} from "@/components/landing-page/landing-heading/landing-heading";

export const LandingPage: FC = () => {
    return (
        <div className="font-poppins h-full w-full">
            <LandingHeading
                title="Devmart"
                subtitle=" Minecraft plugins, web, builds, and more."
            />
        </div>
    )
}