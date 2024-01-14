import React, {FC} from 'react';
import classNames from "classnames";

interface BBCodeProps {
    source: string;
    preview: boolean;
}

export const BBCode: FC<BBCodeProps> = ({
                                            source,
                                            preview
                                        }) => {
    return (
        <div
            className={classNames(preview && "bbcode-preview", "bbcode markdown")}
            dangerouslySetInnerHTML={{__html: source}}
        />
    );
}