import RegisterForm from "@/components/custom/auth/register-form";
import { getSession } from "@/lib/auth/getSession";
import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function RegisterPage() {
    const session = await getSession();

    if (session.jwt) {
        redirect("/");
    }


    return (
        <RegisterForm />
    )

}