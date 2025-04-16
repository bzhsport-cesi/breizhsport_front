//hooks/useAuth.ts
"use client";

import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { SessionData, defaultSession } from "@/lib/session";
import { IUser } from "@/types/types";

const sessionApiRoute = "/api/me";

async function fetcher(input: RequestInfo, init?: RequestInit): Promise<SessionData> {
    return fetch(input, {
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
        ...init,
    }).then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
    });
}

export function useAuth() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR<SessionData>(sessionApiRoute, fetcher, {
        fallbackData: defaultSession,
    });

    async function refresh() {
        mutate(sessionApiRoute);     // ⚡ met à jour le cache SWR
        router.refresh();            // 🔁 met à jour le DOM des Server Components
    }

    async function signIn(formData: FormData) {
        const res = await (await import("@/actions/auth/signin-action")).default(formData);
        if (!res?.error) {
            await refresh();
            router.push("/");
        }
        return res;
    }

    async function signOut() {
        const res = await (await import("@/actions/auth/signout-action")).default();
        await refresh();
        router.push("/");
        return res;
    }

    async function register(formData: FormData) {
        const res = await (await import("@/actions/auth/register-action")).default(formData);
        if (!res?.error) {
            await refresh();
            router.push("/");
        }
        return res;
    }

    const user: IUser | undefined = data?.user ?? undefined

    return {
        user: user,
        isLoading,
        isError: error,
        signIn,
        signOut,
        register,
    };
}