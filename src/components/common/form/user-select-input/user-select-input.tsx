/*
import React, {FC, useState} from 'react';
import {Combobox, Transition} from "@headlessui/react";
import UserRepository from "@/services/repository/UserRepository";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface UserSelectInputProps {
    onChange: (value: object) => void;
    value?: User;
    timeout?: number;
}

export const UserSelectInput: FC<UserSelectInputProps> = ({value, onChange, timeout = 500}) => {
    const [query, setQuery] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [timerId, setTimerId] = useState<any>(0);

    const searchUsers = () => {
        if (query.length < 2) {
            setUsers([]);
            return;
        }

        if (timerId) clearTimeout(timerId);

        setTimerId(setTimeout(async () => {
            try {
                const foundUsers = await UserRepository.findUsersByUsername(query);
                setUsers(foundUsers);
            } catch (error) {
                console.log(error);
            }
        }));
    };


    return (
        <Combobox
            value={value}
            onChange={onChange}
            as="div"
        >
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-md shadow-sm focus:ring dark:border-gray-700 border
                 focus:ring-opacity-50 checked:bg-blue-600 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 bg-white
                 dark:text-gray-300 dark:bg-gray-800">
                    <Combobox.Input
                        displayValue={(user: User) => !value ? '' : user.username ?? ''}
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Enter a username"
                        onChange={e => setQuery(e.target.value)}
                        onInput={searchUsers}
                    />
                    <Combobox.Button
                        className="absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                        <svg aria-hidden="true" className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                clip-rule="evenodd"
                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </Combobox.Button>
                </div>

                <Transition.Root
                    leave="transition ease-in duration-100"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                        {users.length === 0 && (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                {query.length < 2 ? 'Enter at least 2 characters.' : 'No users found.'}
                            </div>
                        )}
                        {users.map(user => (
                            <Combobox.Option value={user} key={user.id}>
                                {({selected, active}) => (
                                    <li
                                        className={classNames(
                                            "relative cursor-default select-none py-2 pl-10 pr-4",
                                            active ? "bg-theme-600 text-white" : "text-gray-900"
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                "block truncate",
                                                selected ? "font-medium" : "font-normal"
                                            )}
                                        >
                                            {user.username} (#{user.id})
                                        </span>
                                        {selected && (
                                            <span
                                                className={classNames(
                                                    "absolute inset-y-0 left-0 flex items-center pl-3",
                                                    active ? "text-white" : "text-theme-600"
                                                )}
                                            >
                                                <FontAwesomeIcon icon="check" className="h-5 w-5" aria-hidden="true"/>
                                            </span>
                                        )}
                                    </li>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition.Root>
            </div>

        </Combobox>
    );
}*/
