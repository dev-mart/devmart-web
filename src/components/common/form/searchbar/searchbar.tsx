import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface SearchbarProps {
    value: string;
    onSubmit: () => void;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    filterButton?: boolean;
    onFilterClick?: () => void;
}

export const Searchbar: FC<SearchbarProps> = ({
                                                  value,
                                                  onSubmit,
                                                  onChange = () => null,
                                                  placeholder = '',
                                                  disabled = false,
                                                  filterButton = false,
                                                  onFilterClick = () => null
                                              }) => {

    const inputEmpty = value.length === 0;

    const submit = (force: boolean = false) => {
        if (!force && disabled) {
            return;
        }
        onSubmit();
    }

    const clearInput = () => {
        onChange('');
        submit(true);
    }

    return (
        <div className="mt-2 my-0 mb-5 relative flex flex-row gap-2.5">
            {filterButton && (
                <button
                    // TODO: check if this works without ref.
                    className="flex gap-3 w-fit break-keep min-h-[48px] h-full items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    data-dropdown-placement="bottom-start"
                    data-dropdown-toggle="filter-dropdown"
                    onClick={onFilterClick}
                >
                    <FontAwesomeIcon icon="filter" className="text-gray-500"/>
                    Filter
                </button>
            )}

            <div className="relative w-full">
                <input
                    className="bg-gray-250 dark:bg-gray-800 rounded-lg border-none px-4 text-base py-3 w-full"
                    value={value}
                    placeholder={placeholder}
                    type="text"
                    onInput={e => onChange((e.target as any).value)}
                />

                <div
                    className={classNames(
                        "absolute top-1 right-1 h-10 w-10 p-2 bg-gray-250 dark:bg-gray-800",
                        inputEmpty ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                    role="button"
                    onClick={clearInput}
                >
                    <FontAwesomeIcon
                        icon="circle-xmark"
                        className={classNames(
                            "h-full w-full transition",
                            inputEmpty ? 'text-black dark:text-gray-200' : 'text-gray-400'
                        )}
                    />
                </div>
            </div>
            <div
                className={classNames(
                    "bg-primary h-full min-h-[48px] aspect-square transition rounded-lg cursor-pointer flex items-center justify-center",
                    {'bg-opacity-50': disabled, 'cursor-not-allowed': inputEmpty || disabled}
                )}
                onClick={() => submit()}
                role="button"
            >
                <FontAwesomeIcon icon="magnifying-glass" className="text-white text-2xl"/>
            </div>
        </div>
    );
};