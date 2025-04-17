//app/api/(auth)/me/route.ts
import { SessionData, sessionOptions } from "@/lib/session";
import { IUser } from "@/types/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    let user: IUser | null = null;

    if (!session?.jwt) {
        console.error("No JWT found in session");
        return NextResponse.json(null);
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${session.jwt}`,
            },
            cache: "no-store",
        });
        if (!res.ok) {
            console.error("Error fetching user data:", res.statusText);
            return NextResponse.json(null);
        }
        user = await res.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json(null);
    }

    return NextResponse.json(user);

}