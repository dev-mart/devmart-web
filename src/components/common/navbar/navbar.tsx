import React, {FC} from 'react';
import classNames from "classnames";
import Link from "next/link";
import {NavbarItem} from "@/components/common/navbar/features/navbar-item";
import {LogoIcon} from "@/components/common/icon/logo-icon";
import css from "@/components/common/navbar/navbar.module.scss";
import {NavbarActionButton} from "@/components/common/navbar/features/navbar-action-button";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

interface NavbarProps {
    background?: boolean;
}

export const Navbar: FC<NavbarProps> = async ({background = false}) => {
    const session = await getServerSession(authOptions) as Session | null;

    return (
        <header className={classNames({'header-filled': background}, 'w-full z-10 justify-center max-w-screen-xl px-3 md:px-6 lg:px-10')}>
            <nav className="h-20 flex flex-row justify-between items-center">
                <Link href="/" className="w-56">
                    <LogoIcon className={classNames(css.headerLogo, background && css.headerLogofillBlack)}/>
                </Link>

                <div>
                    <NavbarItem label="Home" href="/" background={background}/>
                    <NavbarItem label="Paste" href="/paste" background={background}/>
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