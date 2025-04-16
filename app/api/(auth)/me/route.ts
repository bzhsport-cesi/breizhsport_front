//app/api/(auth)/me/route.ts
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    if (!session?.jwt) {
        return NextResponse.json(null);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${session.jwt}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return NextResponse.json(null);
    }

    const user = await res.json();
    return NextResponse.json(user);

}