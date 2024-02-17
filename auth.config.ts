import type {NextAuthConfig} from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            const isLoggedIn = !!auth?.user;
            const isOnAccount = nextUrl.pathname.startsWith('/account');
            if (isOnAccount) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
        async jwt({token, account, profile}) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        }
    },
    session: {
        strategy: 'jwt',
    },
    providers: [],
} satisfies NextAuthConfig;