import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import AuthService from "@/services/AuthService";
import {AxiosError} from "axios";

export const authOptions = {
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const {username, password} = credentials;

                try {
                    const response = await AuthService.login({
                        username,
                        password,
                    });

                    if (response.status !== 200) {
                        return null;
                    }

                    const {userId: id, username: name, email, token} = response.data;

                    return {
                        id,
                        name,
                        email,
                        token
                    }
                } catch (error) {
                    if (error instanceof AxiosError && error.response?.status !== 401) {
                        throw new Error('ApiError');
                    }

                    return null;
                }
            }
        })
    ]
};

export default NextAuth(authOptions);