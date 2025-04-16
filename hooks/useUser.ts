import useSWR from "swr";

import { SessionData, defaultSession, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { IUser } from "@/types/types";



const fetcher = (url: string) => fetch(url).then(res => res.json());


export function useUser() {
    const { data, error, isLoading } = useSWR("/api/me", fetcher);

    return {
        user: data as IUser,
        isLoading,
        isError: !!error,
    };
}