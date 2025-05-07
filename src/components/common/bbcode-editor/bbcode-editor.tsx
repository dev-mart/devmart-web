import React, {FC, useState} from 'react';
import classNames from "classnames";
import {BBCode} from "@/components/common/bbcode/bbcode";
import {Input} from "@/components/common/form/input/input";

interface BBCodeEditorProps {
    value?: string;
    required?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export const BBCodeEditor: FC<BBCodeEditorProps> = ({
                                                        value = '',
                                                        required = false,
                                                        placeholder = 'BBCode content',
                                                        onChange = () => null
                                                    }) => {

    const [showParsed, setShowParsed] = useState<boolean>(false);

    return (
        <div className="bbcode-editor-container flex flex-col">
            <div className="bbcode-editor-header flex flex-row">
                <div
                    className={classNames("item", {active: !showParsed})}
                    onClick={() => setShowParsed(false)}
                >
                    Editor
                </div>
                <div
                    className={classNames("item", {active: showParsed})}
                    onClick={() => setShowParsed(true)}
                >
                    Preview
                </div>
            </div>

            {showParsed ? (
                <BBCode>
                    {value}
                </BBCode>
            ) : (
                <Input
                    value={value}
                    name="bbcode"
                    placeholder={placeholder}
                    required={required}
                    className={"bbcode-editor"}
                />
            )}


        </div>
    );
}