import React, {FC} from 'react';
import classNames from "classnames";
import Link from "next/link";
import {NavbarItem} from "@/components/common/navbar/features/navbar-item";
import {NavbarActionButton} from "@/components/common/navbar/features/navbar-action-button";
import {useSessionHook} from "@/hooks/use-session-hook";

interface NavbarProps {
    background?: boolean;
}

export const Navbar: FC<NavbarProps> = ({background = false}) => {
    const {session} = useSessionHook();

    return (
        <header className={classNames({'header-filled': background}, 'w-full z-10 justify-center max-w-screen-xl px-3 md:px-6 lg:px-10')}>
            <nav className="flex flex-row justify-between items-center">
                <Link href="/" className="w-56 plain text-white text-2xl font-bold">
                    {/*<LogoIcon className={classNames(css.headerLogo, background && css.headerLogofillBlack)}/>*/}
                    Devmart
                </Link>

                <div className="flex">
                    <NavbarItem label="Home" href="/" background={background}/>
                    <NavbarItem label="Paste" href="/paste" background={background}/>
                    <NavbarItem label="Plugins" href="/plugins" background={background}/>
                    <NavbarItem label="Wiki" href="/wiki" background={background}/>

                    {session?.user && (
                        <NavbarItem label="Admin" href="/admin" background={background}/>
                    )}
                </div>

                <NavbarActionButton background={background} session={session}/>
            </nav>
        </header>
    );
}