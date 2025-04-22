import React, {FC} from 'react';
import {LandingHeading} from "@/components/landing-page/landing-heading/landing-heading";
import {BsDiscord} from "react-icons/bs";
import {BiCube, BiDesktop, BiMobile} from "react-icons/bi";
import Image from "next/image";
import skywarsCoverImage from "@public/skywars_cover_image.png";
import bringitMock from "@public/bringit-mock.png";
import {LinkButton} from "@/components/common/button/button";
import {FaArrowRight} from "react-icons/fa";
import classNames from "classnames";

const Container: FC<React.PropsWithChildren<{ className?: string }>> = ({className, children}) => {
    return (
        <div
            className={classNames(className, "flex flex-col bg-white/15 backdrop-blur-sm gap-5 rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,_38,_135,_0.37)] p-8 hover:transform hover:-translate-y-2 transition duration-300")}>
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

const Stat: FC<{ number: string, label?: string }> = ({number, label}) => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center">
            <div className="text-4xl font-extrabold">{number}</div>
            {label && <div className="text-center">{label}</div>}
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
            <div className="flex flex-col items-center justify-center bg-[#f8fafc] py-8 sm:py-16 md:py-32 px-4 md:px-8">
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
            <div className="flex flex-col items-center justify-center bg-slate-100 py-8 sm:py-16 md:py-32 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-screen-xl">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl mb-2">SkyWarsReloaded</h2>
                        <p>Minecraft&#39;s most successful open-source multiplayer plugin with over 650,000 downloads worldwide. SkyWarsReloaded has
                            revolutionized
                            the
                            SkyWars gameplay experience with customizable arenas, powerful game mechanics, and extensive configuration options.</p>
                        <p>
                            Our flagship open-source project showcases our commitment to the gaming community and our technical expertise in creating scalable,
                            feature-rich solutions.
                        </p>
                        <LinkButton className="w-fit" href="https://devmart.net/swr" target="_blank">
                            <span>Check it out!</span>
                            <FaArrowRight/>
                        </LinkButton>
                        <div className="flex flex-wrap gap-8 mt-2 bg-gradient-to-r from-pink-600 to-purple-950 bg-clip-text text-transparent">
                            <Stat number="650k+" label="Downloads"/>
                            <Stat number="1000+" label="Servers"/>
                            <Stat number="4.3" label="Rating"/>
                        </div>
                    </div>
                    <Container className="max-w-md mx-auto">
                        <Image src={skywarsCoverImage} alt="SkyWarss Bow" className="rounded-xl"/>
                    </Container>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center py-8 sm:py-16 md:py-32 px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-screen-xl">
                    <div className="flex justify-center">
                    <Image src={bringitMock} alt="Bring It! app mock" height={608} className="rounded-xl"/>

                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-4xl mb-2">Bring It!</h2>
                        <p>
                            Event planning made fun, fast, and frustration-free. Bring It! is the ultimate shared checklist ap that helps you and your friends
                            organize what to bring to parties, picnics, or group events, without the endless group chats. Add items, assign who&#39;s bringing
                            what, and track progress all in one clean, intuitive interface.
                        </p>
                        <p>
                            Bring It! transforms chaotic planning into collaborative action. Whether you&#39;re hosting a BBQ, birthday, or beach day, our smart
                            item sharing, real-time sync, and sleek mobile-first design ensures you&#39;re always ready, together.
                        </p>

                        <div className="flex flex-wrap gap-8 mt-2 bg-gradient-to-r from-pink-600 to-purple-950 bg-clip-text text-transparent">
                            <Stat number="Coming Soon..."/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}