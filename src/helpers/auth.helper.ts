import {GetServerSidePropsContext} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export async function checkSession(context: GetServerSidePropsContext, requireAuth: boolean = false, invert: boolean = false) {
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log('sesh', session)

    if ((requireAuth !== Boolean(session)) === invert) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            session
        }
    };
}
