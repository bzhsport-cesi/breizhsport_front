"use server"
import z from "zod"

export default async function SignInAction(formData: FormData) {

    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    const data = Object.fromEntries(formData.entries())
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(2),
    })
    const result = schema.safeParse(data)

    if (!result.success) {
        return { error: result.error.format() }
    }
    const { email, password } = result.data

    const res = await fetch(`${apiUrl}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            identifier: email,
            password
        }),
    })

    const json = await res.json()
    if (res.status !== 200) {
        return { error: json.error.message }
    }
    const { jwt, user } = json

    console.log("JWT", jwt)
    console.log("User", user)
}