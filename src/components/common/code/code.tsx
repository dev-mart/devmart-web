import {FC, PropsWithChildren} from "react";

interface CodeProps {
    language?: string;
}

export const Code: FC<PropsWithChildren<CodeProps>> = ({language, children}) => {
    var split = [];
    if (Array.isArray(children)) {
        // remove all entries from the array that are line breaks "\n"
        split = children.filter((line) => line !== "\n");
    } else if (typeof children === "string") {
        split = (children as string).split("\n");
    }

    return (
        <table>
            <tbody>
            {split?.map((line, index) => (
                <tr key={index}>
                    <td className="text-gray-400 text-xs pr-2 select-none">{index + 1}</td>
                    <td className="text-gray-200 text-sm whitespace-pre font-mono">
                        {line}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}