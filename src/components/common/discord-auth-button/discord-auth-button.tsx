import {FC} from 'react';
import Link from "next/link";
import {Icon} from "@/components/common/icon/icon";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";

interface DiscordAuthButtonProps {
    label: string;
    href: string;
}

export const DiscordAuthButton: FC<DiscordAuthButtonProps> = ({
                                                                  label,
                                                                  href
                                                              }) => {
    return (
        <Link href={href} className="rounded-md plain primary bg-discord disabled:opacity-50 hover:bg-indigo-700 flex flex-col align-center p-3">
            <div className="flex flex-row justify-center items-center gap-2 text-white">
                <Icon isFontAwesome icon={faDiscord} background={false} size="2xl" />
                <span className="text-base font-bold">{label}</span>
            </div>
        </Link>
    );
}