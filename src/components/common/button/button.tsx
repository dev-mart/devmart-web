import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, FC} from 'react';
import classNames from "classnames";
import Link from "next/link";

declare type ButtonTheme = 'primary';

const buttonThemes = (className?: string, theme?: ButtonTheme) =>
    classNames(className, 'flex flex-row gap-4 items-center justify-center text-base font-semibold py-2 px-4 rounded-md transition cursor-pointer',
        theme === 'primary' && 'bg-primary text-white hover:bg-primary-600')

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
    onClick?: () => void;
    theme?: ButtonTheme;
    fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
                                            onClick = () => null,
                                            className,
                                            theme = 'primary',
                                            fullWidth = false,
                                            children,
                                            ...props
                                        }) => {
    const classes = buttonThemes(classNames(fullWidth && 'w-full', className), theme);

    return (
        <button className={classes} onClick={onClick} {...props}>
            {children}
        </button>
    );
}

interface LinkButtonProps extends Partial<AnchorHTMLAttributes<HTMLAnchorElement>> {
    href: string;
    theme?: ButtonTheme;
    fullWidth?: boolean;
}

export const LinkButton: FC<LinkButtonProps> = ({
                                                      href,
                                                      className,
                                                      theme = 'primary',
                                                      fullWidth = false,
                                                      children,
                                                      ...props
                                                  }) => {
    const classes = buttonThemes(classNames(fullWidth && 'w-full', className), theme);

    return (
        <Link href={href} className={classes} {...props}>
            {children}
        </Link>
    );
}