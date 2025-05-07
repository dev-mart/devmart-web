import {ISODateString} from "next-auth/src/core/types";

declare module "next-auth/jwt" {
    interface DefaultJWT extends Record<string, unknown> {
        name: string;
        email: string;
        sub: string;
        id: string;
        token: string;
    }
    interface JWT extends Record<string, unknown>, DefaultJWT {
        name: string;
        email: string;
        sub: string;
        id: string;
        token: string;
    }
}

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
    }

    interface DefaultSession {
        user: User;
        expires: ISODateString;
    }

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            token: string;
        }
    }
}
