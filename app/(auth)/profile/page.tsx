

export default async function ProfilePage() {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const data = await fetch(`${apiUrl}/users/me`)
    const test = await data.json()
    console.log("test", test)

    return (
        <main className="flex flex-col gap-2 p-2">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p>Profile page content goes here.</p>
        </main>
    )
}