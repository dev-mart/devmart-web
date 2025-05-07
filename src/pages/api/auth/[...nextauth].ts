import NextAuth, {Session, User} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {login} from "@/services/AuthService";
import {AxiosError} from "axios";
import {JWT} from "next-auth/jwt";

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
                    const response = await login({
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
            },
        })
    ],
    callbacks: {
        async jwt({token, user}: { token: JWT, user?: User }): Promise<JWT> {
            console.log('token', token);
            console.log('user', user);

            if (user) {
                token.id = user.id;
                token.token = user.token;
            }

            return token;
        },
        async session({session, token}: { session: Session, token: JWT }) {
            session.user.id = token.id as string;
            session.user.token = token.token as string;
            return session;
        }
    }
};

export default NextAuth(authOptions);