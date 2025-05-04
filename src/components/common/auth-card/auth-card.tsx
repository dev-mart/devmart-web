import React, {FC} from 'react';

interface AuthCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    prefixNode?: React.ReactNode;
}

export const AuthCard: FC<AuthCardProps> = ({
                                                title,
                                                subtitle,
                                                prefixNode,
                                                children
                                            }) => {
    return (
        <div className="flex flex-col items-center justify-center py-6 flex-grow w-full h-full">
            {prefixNode && prefixNode}
            <h1>{title}</h1>
            <p>{subtitle}</p>

            <div className="w-full sm:max-w-md mt-3 px-6 py-4 sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}