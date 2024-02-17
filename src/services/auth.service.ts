import NextAuth, {Account, User} from "next-auth";
import {authConfig} from "../../auth.config";
import Credentials from "@auth/core/providers/credentials";
import axios from "axios";
import {AUTH_LOGIN_ENDPOINT, USERS_ME_ENDPOINT} from "@/constants/api-endpoints";
import {CredentialsSignin} from "@auth/core/errors";
import {AdapterSession, AdapterUser} from "@auth/core/adapters";

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            // @ts-ignore
            async authorize({username, password}) {
                const response = await axios.post(AUTH_LOGIN_ENDPOINT, {
                    username, password
                });

                if (response.status !== 200) {
                    throw new CredentialsSignin();
                    // return null;
                }

                const data = response.data;
                return {
                    token: data.token,
                };
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async session({session, token, user}) {
            console.log('sessssiionn', session, user, token)
            const response = await axios.get(USERS_ME_ENDPOINT, {
                headers: {
                    'Authorization': `Bearer ${token.accessToken}`
                }
            });

            if (response.status === 200) {
                session.user = response.data;
            }

            console.log('session', session)

            return session;
        },
        async jwt({user, token, session}) {
            console.log('jwt', user, token, session)
            if (user) {
                // @ts-ignore
                token.accessToken = user.token;
            }
            return token;
        }
    }
})