import React, {FC} from 'react';

interface FileInputProps {
    value: string;
    onUpload: (file: File) => void;
    accept?: string;
}

export const FileInput: FC<FileInputProps> = ({
                                                  value,
                                                  onUpload,
                                                  accept = "*",
                                              }) => {
    return (
        <input
            value={value}
            accept={accept} // @ts-ignore
            onInput={(e) => onUpload(e.target.files[0] as File)}
            className="mt-2 text-sm file:bg-black file:text-white file:rounded-l-md hover:file:bg-gray-800 file:font-poppins
                        file:transition cursor-pointer file:px-2 file:py-1 file:mr-2 w-full block border"
            type="file"
        />
    )
};