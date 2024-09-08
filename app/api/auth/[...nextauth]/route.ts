import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import { OAuth2Client } from 'google-auth-library';
// import {checkAndSaveUser, getUserByEmail} from "~/servers/user";
import {headers} from "next/headers";
import {useSession} from "next-auth/react";
import {checkAndSaveUser} from "@/server/user";

const googleAuthClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    // pages: {
    //   signIn: '/login123'
    // },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: false,
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            const headerAll = headers();
            const userIp = headerAll.get("x-forwarded-for");
            await checkAndSaveUser(user.name, user.email, user.image, userIp);

            return true
        },
        async redirect({url, baseUrl}) {
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            }
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) {
                return url
            }

            return baseUrl
        },
        async session({session}) {
            if (session) {
                const email = session?.user?.email;
                if (email) {
                    // session.user = await getUserByEmail(email);
                    return session;
                }
            }
            return session;
        }
    }
};



const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};