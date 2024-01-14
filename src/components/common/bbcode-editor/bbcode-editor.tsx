import React, {FC, useEffect, useState} from 'react';
import classNames from "classnames";
import {BBCode} from "@/components/common/bbcode/bbcode";
import BBCodeService from "@/services/BBCodeService";
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
    const [parsedBBCode, setParsedBBCode] = useState<string>('');

    useEffect(() => {
        setParsedBBCode(BBCodeService.parse(value));
    }, [value]);

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
                <BBCode
                    source={parsedBBCode}
                    preview
                />
            ) : (
                <Input
                    value={value}
                    onChange={(e) => onChange(e)}
                    isTextArea
                    placeholder={placeholder}
                    required={required}
                    className={"bbcode-editor"}
                />
            )}


        </div>
    );
}