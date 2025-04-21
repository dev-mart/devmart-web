import React, {FC} from 'react';
import {LandingHeading} from "@/components/landing-page/landing-heading/landing-heading";
import {BsDiscord} from "react-icons/bs";
import {BiCube, BiDesktop, BiMobile} from "react-icons/bi";

const Container: FC<React.PropsWithChildren> = ({children}) => {
    return (
        <div
            className="flex flex-col bg-white/15 backdrop-blur-sm gap-5 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,_38,_135,_0.37)] p-8 hover:transform hover:-translate-y-2 transition duration-300">
            {children}
        </div>
    );
}

const ServiceBlock: FC<{ title: string, description: string, icon: React.ReactElement }> = ({title, description, icon}) => {
    return (
        <Container>
            <div className="flex items-center justify-center rounded-xl w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-950 text-white text-2xl">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-black">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </Container>
    );
}

const Stat: FC<{ number: string, label: string }> = ({number, label}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-4xl font-bold text-pink-600">{number}</div>
            <div className="text-center">{label}</div>
        </div>
    )
}

export const LandingPage: FC = () => {
    return (
        <>
            <LandingHeading
                title="Devmart"
                subtitle=" Minecraft plugins, web, builds, and more."
            />
            <div className="flex flex-col items-center justify-center bg-[#f8fafc] py-32 px-4 md:px-8">
                <div className="flex flex-col gap-16 max-w-screen-xl">
                    <div className="flex flex-col gap-4 items-center">
                        <h2 className="text-4xl">Our Services</h2>
                        <p className="max-w-xl text-center">
                            Innovative solutions tailored to your specific needs with cutting-edge technologies
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                        <ServiceBlock
                            title="Web Applications"
                            description="Custom web solutions built with React, NextJS, and TypeScript for optimal performance and user experience."
                            icon={<BiDesktop/>}
                        />
                        <ServiceBlock
                            title="Minecraft Plugins"
                            description="Enterprise-grade Minecraft plugins that enhance gameplay and server management with innovative features."
                            icon={<BiCube/>}
                        />
                        <ServiceBlock
                            title="Discord Bots"
                            description="Custom Discord bots designed to automate tasks, engage users, and enhance community interaction."
                            icon={<BsDiscord/>}
                        />
                        <ServiceBlock
                            title="Mobile Applications"
                            description="Cross-platform mobile apps built with Flutter for seamless experiences across all devices."
                            icon={<BiMobile/>}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-slate-100 py-32 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-screen-xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl mb-2">SkyWarsReloaded</h2>
                        <p>Minecraft's most successful open-source multiplayer plugin with over 650,000 downloads worldwide. SkyWarsReloaded has revolutionized
                            the
                            SkyWars gameplay experience with customizable arenas, powerful game mechanics, and extensive configuration options.</p>
                        <p>
                            Our flagship open-source project showcases our commitment to the gaming community and our technical expertise in creating scalable,
                            feature-rich solutions.
                        </p>
                        <div className="flex gap-8 mt-2">
                            <Stat number="650k+" label="Downloads"/>
                            <Stat number="1000+" label="Servers"/>
                            <Stat number="4.3" label="Rating"/>
                        </div>
                    </div>
                    <Container>
                        <div className="bg-radial from-black to-green-600 rounded-2xl">
                            <h1>hello</h1>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}