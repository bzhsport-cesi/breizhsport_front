import { cookies } from "next/headers";
import { getIronSession, IronSession } from "iron-session";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function getSession(): Promise<IronSession<SessionData>> {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    return session;
}