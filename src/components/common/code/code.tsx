import {FC, PropsWithChildren, ReactElement} from "react";

interface CodeProps {
    language?: string;
}

export const Code: FC<PropsWithChildren<CodeProps>> = ({language, children}) => {
    let split = [];
    if (Array.isArray(children)) {
        // remove all entries from the array that are line breaks "\n"
        split = children.filter((line) => {
            if (typeof line === 'string') return line?.toString().match(/(\[BR])|\n|<br\/?>/gi) == null;
            return (line as ReactElement).type !== "br";
        });
    } else if (typeof children === "string") {
        split = (children as string).split("\n");
    }

    return (
        <div className="bg-gray-100 border-gray-200 dark:bg-gray-950 border overflow-auto dark:border-gray-800 rounded-md my-2">
            <div className="py-2 px-3 border-b border-gray-200 dark:border-gray-800">
                Code{language && ": "}{language}
            </div>
            <div className="overflow-auto max-w-full max-h-[30rem] px-3 py-1">
                <table>
                    <tbody>
                    {split?.map((line, index) => (
                        <tr key={index}>
                            <td className="text-gray-600 dark:text-gray-400 text-xs pr-2 select-none">{index + 1}</td>
                            <td className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre font-mono">
                                {line}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}