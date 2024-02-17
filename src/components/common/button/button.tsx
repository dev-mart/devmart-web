import React, {ButtonHTMLAttributes, FC} from 'react';
import classNames from "classnames";

declare type ButtonTheme = 'primary';

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
    onClick?: () => void;
    theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = ({
                                            onClick = () => null,
                                            className,
                                            theme = 'primary',
                                            children,
                                            ...props
                                        }) => {
    return (
        // TODO add theme css
        <button
            className={classNames(className, 'flex flex-row items-center justify-center text-base w-full font-semibold py-2 px-4 rounded-md transition',
                theme === 'primary' && 'bg-primary text-white hover:bg-primary-600')}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}