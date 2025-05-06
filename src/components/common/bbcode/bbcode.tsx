import React, {FC} from 'react';
import classNames from "classnames";
import {parseBBCode} from "@/services/BBCodeService";

interface BBCodeProps {
    source: string;
    preview: boolean;
}

export const BBCode: FC<BBCodeProps> = ({
                                            source,
                                            preview
                                        }) => {
    const parsedSource = parseBBCode(source);
    return (
        <div
            className={classNames(preview && "bbcode-preview", "bbcode markdown")}
            dangerouslySetInnerHTML={{__html: parsedSource}}
        />
    );
}