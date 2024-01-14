import React, {FC} from 'react';
import Link from 'next/link';
import {SimpleCard} from "@/components/common/simple-card/simple-card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface QuickLinkProps {
    label: string;
    url: string;
    external?: boolean;
}

export const QuickLink: FC<QuickLinkProps> = ({
                                                  label,
                                                  url,
                                                  external = false,
                                              }) => {
    return (
        <Link
            href={url}
            target={external ? '_blank' : '_self'}
        >
            <SimpleCard className="col-span-12 lg:col-span-4">
                <div className="flex items-center justify-between gap-2">
                    <div>{label}</div>
                    <FontAwesomeIcon icon="arrow-right" className="text-lg"/>
                </div>
            </SimpleCard>
        </Link>
    );
}