import {FC, PropsWithChildren} from "react";
import {SiDiscord, SiGithub, SiLinkedin, SiSpigotmc} from "react-icons/si";
import classNames from "classnames";

const SocialLink: FC<PropsWithChildren<{ href: string }>> = ({href, children}) => {
    return (
        <a href={href} target="_blank" className="bg-white/10 rounded-full h-10 w-10 flex items-center justify-center hover:bg-white/20 transition duration-300 cursor-pointer text-white hover:transform hover:-translate-y-1">
            {children}
        </a>
    )
}

export const FooterSection: FC<PropsWithChildren<{ title: string, largeTitle?: boolean }>> = ({title, largeTitle, children}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className={classNames("font-extrabold", largeTitle ? "text-3xl" : "text-xl")}>
                {title}
            </div>
            {children}
        </div>
    )
}

export const Footer: FC = () => {
    return (
        <footer className="bg-gradient-to-br from-indigo-950 to-fuchsia-950 text-white pt-20 pb-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <FooterSection title="Devmart" largeTitle>
                        <div className="text-slate-200">
                            We build exceptional digital experiences with cutting-edge technologies and innovative solutions.
                        </div>
                        <div className="flex gap-4">
                            <SocialLink href="https://discord.gg/sghEU92">
                                <SiDiscord/>
                            </SocialLink>
                            <SocialLink href="https://github.com/dev-mart">
                                <SiGithub/>
                            </SocialLink>
                            <SocialLink href="https://www.spigotmc.org/resources/authors/devmart.253369/">
                                <SiSpigotmc/>
                            </SocialLink>
                            <SocialLink href="https://www.linkedin.com/in/lukasvdgaag/">
                                <SiLinkedin/>
                            </SocialLink>
                        </div>
                    </FooterSection>
                    <div></div>
                    <FooterSection title="Services">
                        <ul className="flex flex-col gap-2 text-slate-200 list-none">
                            <li>Web Applications</li>
                            <li>Minecraft Plugins</li>
                            <li>Discord Bots</li>
                            <li>Mobile Applications</li>
                        </ul>
                    </FooterSection>
                    <FooterSection title="Contact">
                        <ul className="flex flex-col gap-2 text-slate-200 list-none">
                            <li>info@devmart.net</li>
                            <li><a href="/discord" target="_blank">Support</a></li>
                        </ul>
                    </FooterSection>
                </div>
                <div className="border-t border-t-white/10 pt-8 text-center text-sm text-slate-300">
                    <p className="mb-2">
                        &copy; {new Date().getFullYear()} Devmart. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}