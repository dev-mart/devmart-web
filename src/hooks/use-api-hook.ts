import {ApiError, ApiStatus} from "@/interfaces/api.interface";
import {useState} from "react";

export const useApiHook = <T> () => {
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.unknown);
    const [error, setError] = useState<ApiError>();
    const [data, setData] = useState<T>();

    return {
        data,
        status,
        error,
        setData,
        setStatus,
        setError
    }
}