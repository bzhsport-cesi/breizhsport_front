//hooks/useAuth.ts
"use client";

import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { SessionData, defaultSession } from "@/lib/session";
import { IUser } from "@/types/types";
import SignInAction from "@/actions/auth/signin-action";
import SignOutAction from "@/actions/auth/signout-action";
import RegisterAction from "@/actions/auth/register-action";

const sessionApiRoute = "/api/me";

async function fetcher(input: RequestInfo, init?: RequestInit): Promise<IUser> {
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
    const { data, error, isLoading } = useSWR<IUser>(sessionApiRoute, fetcher, {
    });

    async function refresh() {
        mutate(sessionApiRoute);     // ⚡ met à jour le cache SWR
        router.refresh();            // 🔁 met à jour le DOM des Server Components
    }

    async function signIn(formData: FormData) {
        const res = await SignInAction(formData);
        if (!res?.error) {
            await refresh();
            router.push("/");
        }
        return res;
    }

    async function signOut() {
        const res = await SignOutAction();
        await refresh();
        router.push("/");
        return res;
    }

    async function register(formData: FormData) {
        const res = await RegisterAction(formData);
        if (!res?.error) {
            await refresh();
            router.push("/");
        }
        return res;
    }

    return {
        user: data,
        isLoading,
        isError: error,
        signIn,
        signOut,
        register,
    };
}