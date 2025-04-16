"use server"

import { getSession } from "@/lib/auth/getSession";
import { z } from "zod";

export default async function RegisterAction(formData: FormData) {
    const session = await getSession();

    if (session.jwt) {
        return { error: "You are already logged in" };
    }

    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const data = Object.fromEntries(formData.entries());
    const schema = z.object({
        username: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(2),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
        return { error: result.error.format() };
    }
    const { username, email, password } = result.data;

    const res = await fetch(`${apiUrl}/auth/local/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    const json = await res.json();
    if (res.status !== 200) {
        return { error: json.error.message };
    }

    session.jwt = json.jwt;
    session.isLoggedIn = true;

    await session.save();
}