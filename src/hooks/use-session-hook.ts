import {useEffect, useState} from "react";
import {Session} from "next-auth";
import {getSession} from "next-auth/react";
import nextAuth from "@/pages/api/auth/[...nextauth]";

export const useSessionHook = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession(nextAuth);
            setSession(sessionData);
        }
        fetchSession()
    }, [])

    return {session};
}