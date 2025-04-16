"use server"

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "@/lib/session";

export default async function SignOutAction() {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    session.destroy()
    return { message: "Logged out successfully" }
}
