import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import css from "@/components/common/sidebar-item/sidebar-item.module.scss";
import Link from "next/link";

interface NavbarPopupItemProps {
    type: 'link' | 'button';
    text: string;
    icon: IconProp;
    to?: string;
    onClick?: () => void;
    background?: boolean;
}

export const SidebarItem: FC<NavbarPopupItemProps> = ({
                                                              text,
                                                              onClick,
                                                              type,
                                                              icon,
                                                              to,
                                                              background = false
                                                          }) => {
    const commonClassNames = [css.navbarPopupItem, background ? css.navbarPopupItemBg : css.navbarPopupItemNoBg];
    const content = (<>
        <FontAwesomeIcon icon={icon} className="text-xs min-w-3"/>
        <span>{text}</span>
    </>);

    return (
        <>
            {type === 'link' && to ? (
                <Link
                    href={to}
                    className={classNames(commonClassNames, "plain")}
                >
                    {content}
                </Link>
            ) : (
                <button
                    type="button"
                    className={classNames(commonClassNames)}
                    onClick={onClick}
                >
                    {content}
                </button>
            )}
        </>
    );
}