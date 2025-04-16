//lib/session.ts
import type { SessionOptions } from "iron-session"

export interface SessionData {
    jwt?: string,

    isLoggedIn: boolean,
}

export const sessionOptions: SessionOptions = {
    password: process.env.AUTH_SECRET as string,
    cookieName: "iron-session-cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData extends SessionData { }
}

