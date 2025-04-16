"use client"

import { useAuth } from "@/hooks/useAuth"

export default function RegisterForm() {

    const { register } = useAuth()

    const handleRegister = async (formData: FormData) => {
        const res = await register(formData)
        if (res?.error) {
            console.log(res.error)
        } else {
            console.log("Registered successfully")
        }
    }

    return (
        <form action={handleRegister} className="flex flex-col gap-2 p-2">
            <input type="text" name="username" placeholder="Username" className="border p-2 rounded-md" />
            <input type="email" name="email" placeholder="Email" className="border p-2 rounded-md" />
            <input type="password" name="password" placeholder="Password" className="border p-2 rounded-md" />
            <button type="submit" className="bg-primary text-white p-2 rounded-md">Register</button>
        </form>
    )
}