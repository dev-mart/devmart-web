import React, {FC} from 'react';
import {FormErrors} from "@/interfaces/FormErrors";
import {Input} from "@/components/common/form/input/input";

interface FileInputProps {
    value: string;
    onChange: (value: string) => void;
    onUpload: (file: File) => void;
    accept?: string;
    errors?: FormErrors;
    item?: string;
}

export const FileInput: FC<FileInputProps> = ({
                                                  value,
                                                  onChange,
                                                  onUpload,
                                                  accept = "*",
                                                  errors = {},
                                                  item
                                              }) => {
    const hasError = errors && item && errors[item];

    return (
        <Input
            value={value}
            accept={accept}
            onInput={(e) => onUpload(e)}
            onChange={onChange}
            errors={errors}
            item={item}
            className="mt-2 text-sm file:bg-black file:text-white file:rounded-l-md hover:file:bg-gray-800 file:font-poppins
                        file:transition cursor-pointer file:px-2 file:py-1 file:mr-2 w-full block border"
            type="file"
        />
    )
};