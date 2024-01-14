import React, {FC} from 'react';
import Link from 'next/link';
import classNames from "classnames";
import css from '@/components/common/quick-links/styled-quick-link.module.scss';
import {SimpleCard} from "@/components/common/simple-card/simple-card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface QuickLinkProps {
    title: string;
    description: string;
    url: string;
    urlText: string;
    icon: IconProp;
    external?: boolean;
    variant?: 'github' | 'spigotmc' | 'discord';
}

export const QuickLink: FC<QuickLinkProps> = ({
                                                  title,
                                                  description,
                                                  url,
                                                  urlText,
                                                  icon,
                                                  external = false,
                                                  variant
                                              }) => {
    return (
        <Link
            href={url}
            target={external ? '_blank' : '_self'}
        >
            <SimpleCard className={classNames(
                variant === 'github' ?? css.gc,
                variant === 'spigotmc' ?? css.sp,
                variant === 'discord' ?? css.dc,
                css.styledQuickLink
            )}>
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={icon} className="text-xl"/>
                    <div className="font-semibold text-lg">{title}</div>
                </div>
                <p>{description}</p>
                <Link href={url} className="static mt-1">{urlText}</Link>
            </SimpleCard>

        </Link>
    );
}