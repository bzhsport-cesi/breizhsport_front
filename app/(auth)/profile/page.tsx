import { IStrapiAPIResponse, IUser } from "@/types/types";


export default async function ProfilePage() {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    let user: IUser | null = null;

    try {
        const res = await fetch(`${apiUrl}/users/me`)
        if (res.ok) {
            user = await res.json() as IUser
        } else {
            console.error("Error fetching user data:", res.statusText)
        }
    } catch (error) {
        console.error(error)
    }

    return (
        <main className="flex flex-col gap-2 p-2">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>Profile page content goes here.</p>
        </main>
    )
}