import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {faCircleXmark, faFilter, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

interface SearchbarProps {
    value: string;
    onSubmit: (value: string) => void;
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
    const isInputEmpty = () => value.trim().length === 0;

    const submit = (force: boolean = false) => {
        if (!force && disabled) {
            return;
        }
        onSubmit(value);
    }

    const clearInput = () => {
        if (isInputEmpty()) {
            return;
        }

        onChange('');
        onSubmit('');
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
                    <FontAwesomeIcon icon={faFilter} className="text-gray-500"/>
                    Filter
                </button>
            )}

            <div className="relative w-full">
                <input
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg border-none px-4 text-base py-3 w-full"
                    value={value}
                    placeholder={placeholder}
                    type="text"
                    onInput={e => onChange((e.target as any).value)}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                />

                <div
                    className={classNames(
                        "absolute top-1 right-1 h-10 w-10 p-2 bg-gray-100 dark:bg-gray-800",
                        isInputEmpty() ? 'cursor-not-allowed' : 'cursor-pointer'
                    )}
                    role="button"
                    onClick={clearInput}
                >
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className={classNames(
                            "h-full w-full transition",
                            isInputEmpty() ? 'text-gray-400' : 'text-black dark:text-gray-200'
                        )}
                    />
                </div>
            </div>
            <div
                className={classNames(
                    "bg-primary h-full min-h-[48px] aspect-square transition rounded-lg cursor-pointer flex items-center justify-center",
                    {'bg-opacity-50': disabled, 'cursor-not-allowed': isInputEmpty() || disabled}
                )}
                onClick={() => submit()}
                role="button"
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white text-2xl"/>
            </div>
        </div>
    );
};