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

    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            token: string;
        }
    }
}
