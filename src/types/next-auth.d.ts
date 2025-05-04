import {ISODateString} from "next-auth/src/core/types";

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

    interface DefaultJWT extends Record<string, unknown> {
        name: string;
        email: string;
        sub: string;
    }
    interface JWT extends Record<string, unknown>, DefaultJWT {
        id: string;
        token: string;
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
