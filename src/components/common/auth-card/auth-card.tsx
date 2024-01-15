import React, {FC} from 'react';

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export const AuthCard: FC<AuthCardProps> = ({
                                                 title,
                                                 subtitle,
                                                 children
                                             }) => {
    return (
        <div className="flex flex-col items-center justify-center pt-6 sm:pt-0 flex-grow w-full">
            <h1 className="text-">{title}</h1>
            <p>{subtitle}</p>

            <div className="w-full sm:max-w-md mt-3 px-6 py-4 bg-white dark:bg-gray-900 sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}