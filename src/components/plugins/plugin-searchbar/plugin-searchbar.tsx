"use client"

import React, {FC, useEffect} from 'react';
import {Searchbar} from "@/components/common/form/searchbar/searchbar";
import {useRouter} from 'next/router';

interface PluginSearchbarProps {
    initialValue: string | undefined;
}

export const PluginSearchbar: FC<PluginSearchbarProps> = ({initialValue}) => {
    const [value, setValue] = React.useState(initialValue || '');
    const [submittedValue, setSubmittedValue] = React.useState(initialValue || '');
    const router = useRouter();

    useEffect(() => {
        if (submittedValue === initialValue) {
            return;
        }

        const currentQuery = router.query;
        currentQuery.query = submittedValue;
        currentQuery.page = "1";

        router.replace({
            query: currentQuery
        })
    }, [initialValue, router, submittedValue]);

    return (
        <Searchbar
            value={value}
            onSubmit={setSubmittedValue}
            onChange={setValue}
            disabled={value === submittedValue}
            placeholder="Find a plugin..."
        />
    )
}