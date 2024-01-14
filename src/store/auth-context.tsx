import {useRouter} from "next/router";
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import AuthService from "@/services/AuthService";
import {LoginBody} from "@/interfaces/LoginBody";
import {User} from "@/models/user/User";
import {AccountTheme} from "@/models/user/AccountTheme";
import {AxiosResponse} from "axios";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextType {
    user: User | null;
    loaded: boolean;
    error: unknown | null;
    login: (payload: LoginBody) => Promise<any>; // Adjust the type of payload as necessary
    logout: () => Promise<any>;
    getAuthUser: (force?: boolean) => Promise<User | null>;
    applyTheme: (theme?: AccountTheme) => void;
    loggedIn: () => boolean;
    isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loaded: false,
    error: null,
    login: async () => null,
    logout: async () => null,
    getAuthUser: async () => null,
    applyTheme: () => null,
    loggedIn: () => false,
    isAdmin: () => false
});

export function useAuth(): AuthContextType {
    return useContext(AuthContext);
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<unknown>(null);
    const router = useRouter();

    const login = async (payload: LoginBody): Promise<AxiosResponse | null> => {
        try {
            setLoaded(false);
            return await AuthService.login(payload);
        } catch (error) {
            setError(error);
            return null;
        }
    }

    const logout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            await router.push('/login');
        } catch (error) {
            setUser(null);
            setError(error);
        }
    }

    const getAuthUser = useCallback(async (force = false): Promise<User | null> => {
        if (!force && loaded) return user;
        try {
            const res = await AuthService.getAuthUser();
            setUser(User.fromJson(res.data.data));
            setLoaded(true);
            return user;
        } catch (error) {
            setUser(null);
            setLoaded(true);
            setError(error);
            return null;
        }
    }, [loaded, user])

    const applyTheme = (theme: string | undefined = undefined) => {
        if (!theme) theme = user?.theme ?? AccountTheme.System;

        if (theme === AccountTheme.System) {
            theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? AccountTheme.Dark : AccountTheme.Light;
        }

        if (theme === AccountTheme.Dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    const loggedIn = () => !!user;
    const isAdmin = () => user?.isAdmin() ?? false;

    useEffect(() => {
        getAuthUser().then();
    }, [getAuthUser]);

    return (
        <AuthContext.Provider value={{
            user,
            loggedIn,
            isAdmin,
            login,
            logout,
            getAuthUser,
            applyTheme,
            loaded,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )

}