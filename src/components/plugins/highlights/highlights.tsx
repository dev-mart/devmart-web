// interface HighlightsProps {
//
// }

import {FC, ReactNode} from "react";
import {Icon} from "@/components/common/icon/icon";

export interface Highlight {
    description: string;
    icon: string | ReactNode;
    title?: string;
}

interface HighlightsProps {
    highlights: Highlight[];
}

export const Highlights: FC<HighlightsProps> = ({highlights}) => {
    return (
        <div className="pt-6 mb-6 border-b border-b-gray-200 dark:border-b-gray-700 flex flex-row gap-8">
            {highlights.map((highlight) => (
                <div className="mb-6 lg:max-w-1/2 flex flex-row items-center gap-4" key={highlight.description}>
                    <Icon icon={highlight.icon} />

                    <div className="flex flex-col justify-center content-center">
                        {highlight.title && <div className="text-gray-500 dark:text-gray-400">{highlight.title}</div>}
                        <div className="text-base">{highlight.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}