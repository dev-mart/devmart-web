import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import AuthService from "@/services/AuthService";

const handler = NextAuth({
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
                } catch (e) {
                    return null;
                }
            }
        })
    ]
});

export {handler as GET, handler as POST, handler as authOptions}